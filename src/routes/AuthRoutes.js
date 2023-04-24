import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthController.js";
import { userValidation, signInValidation } from "../middleAware/AuthValidation.js";

const authRouter = Router()

Router.post("/sign-up", userValidation, signUp)
Router.post("/sign-in", signInValidation, signIn)

export default Router;