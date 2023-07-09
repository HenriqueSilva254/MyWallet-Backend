import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //repeat_password: joi.ref('password')
  });

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //repeat_password: joi.ref('password')
  });