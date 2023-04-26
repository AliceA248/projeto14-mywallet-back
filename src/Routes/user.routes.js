import { findUser, signIn, signUp } from "../Controllers/users.controllers.js"
import { Router } from "express";
import {
	validateLoginSchema,
	validateUserSchema,
} from "../Middlewares/ValidationMiddleware.js";

const userRouter = Router();

userRouter.post("/cadastro", validateUserSchema, signUp);
userRouter.post("/login", validateLoginSchema, signIn);
userRouter.post("/usuarios", findUser);

export default userRouter;