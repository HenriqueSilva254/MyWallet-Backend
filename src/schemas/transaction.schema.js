import joi from "joi";

export const transactionSchema = joi.object({
    value: joi.number().precision(2).required(),
    description: joi.string().min(3)
  });