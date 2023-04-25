import express from 'express'
import {
createTransaction,
findTransactions
} from '../controllers/transaction.js'
import { authRoutesValidation } from "../middleAware/authSchemaValidator.js"
import { transactionSchemaValidation } from '../middleAware/transaction.js'

const router = express.Router()

router.use(authRoutesValidation)

router.route('/transactions')
.post(transactionSchemaValidation, createTransaction)
.get(findTransactions)

export default router