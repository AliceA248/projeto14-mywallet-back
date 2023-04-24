import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)


try {
    console.log("Conectou corretamente com o Mogo")
    
} catch (error) {
    console.error(error)
    
}

const db = mongoClient.db()


//Trazer isso pro controllers


export const users = db.collection("users")
export const session = db.collection("session")
export const transactions = db.collection("transactions")