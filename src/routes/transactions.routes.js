import { Router } from "express";
import { deleteTransaction, getTransactions, newTransaction } from "../controllers/transactionsController.js";
import { validationSchemas } from "../middlewares/validationSchema.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
import { tokenValidation } from "../middlewares/validationAuth.js";

const transactionRouter = Router()

transactionRouter.post('/nova-transacao/:tipo',validationSchemas(transactionSchema), tokenValidation, newTransaction)
transactionRouter.get('/transactions', tokenValidation, getTransactions)
transactionRouter.delete('/delete-transacao', tokenValidation, deleteTransaction)

export default transactionRouter