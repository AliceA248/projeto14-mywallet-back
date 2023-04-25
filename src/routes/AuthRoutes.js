import { Router } from 'express'
import {
  createTransaction,
  findTransactions
} from '../controllers/transaction.js'
import { authRoutesValidation } from "../middleAware/authSchemaValidator.js"
import { transactionSchemaValidation } from '../middleAware/transaction.js'

const router = Router()

router.use(authRoutesValidation)
router.post("/transactions", transactionSchemaValidation, createTransaction)
router.get("/transactions", findTransactions)

export default router

