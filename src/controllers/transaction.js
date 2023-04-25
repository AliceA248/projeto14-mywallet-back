import { transactionsCollection } from '../database/dabaseConection.js'

export async function createTransaction(req, res) {
  const transaction = res.locals.transaction

  try {
    await transactionsCollection.insertOne(transaction)
    res.status(201).send("Transação efetuada com sucesso")
  } catch (error) {
    console.error(error)
    res.status(500).send("Houve um problema no servidor")
  }
}

async function getTransactions(user) {
  try {
    const transactions = await transactionsCollection.find({ user: user._id }).toArray()
    return transactions
  } catch (error) {
    console.error(error)
    throw new Error("Houve um problema ao buscar as transações")
  }
}

export async function findTransactions(req, res) {
  const user = res.locals.user

  try {
    const transactions = await getTransactions(user)
    const userData = await usersCollection.findOne({ _id: user._id }, { projection: { password: 0 } })

    res.send({ transactions, user: userData })
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message ? error.message : "Houve um problema no servidor")
  }
}
