import { Router } from "express";
import { validateSchema } from "../Middlewares/ValidationMiddleware.js"
import {
newTransaction,
getTransactions,
} from "../Controllers/transactions.controllers.js"

const transactionsRouter = Router();

transactionsRouter.post("/transactions", validateSchema, newTransaction);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;

