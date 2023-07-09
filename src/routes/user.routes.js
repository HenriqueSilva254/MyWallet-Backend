import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";
import { validationSchemas } from "../middlewares/validationSchema.js";
import { tokenValidation } from "../middlewares/validationAuth.js";

const userRouter = Router()

// Cadastro
userRouter.post("/sign-up",validationSchemas(signUpSchema),  signUp);
// Login 
userRouter.post("/sign-in",validationSchemas(signInSchema), signIn)
// Get usuario
//userRouter.get("/user",tokenValidation, getUser)
export default userRouter