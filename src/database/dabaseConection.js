import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)

async function connect() {
  try {
    await mongoClient.connect()
    console.log('Conectou com o mongoDB')
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error)
  }
}

connect()

export const db = mongoClient.db()
export const usersCollection = db.collection('users')
export const sessionsCollection = db.collection('sessions')
export const transactionsCollection = db.collection('transactions')

