import { Router } from "express";
import { login, register } from "./authCn.js";
import { validateLogin, validateRegister } from "./authValidator.js";

const authRouter = Router()
authRouter.route('/login').post(validateLogin,login)
authRouter.route('/register').post(validateRegister,register)
export default authRouter