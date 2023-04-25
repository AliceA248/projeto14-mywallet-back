import dayjs from "dayjs"
import { transactionSchema } from "../model/transaction.js"

export function transactionSchemaValidation(req, res, next) {
  const { value, description, type } = req.body
  const user = res.locals.user

  const transaction = {
    value,
    description,
    type,
    user: user._id,
    createdAt: dayjs().format("DD/MM/YYYY")
  }

  try {
    transactionSchema.validateSync(transaction, { abortEarly: false })
  } catch (error) {
    const errorMessages = error.errors.map((errorMessage) => errorMessage.replace(/"/g, ''))
    return res.status(400).send(errorMessages)
  }

  res.locals.transaction = transaction

  next()

}
