import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
  const client = new MongoClient(process.env.DATABASE_URL);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.log(err.message);
    client.close();
    process.exit(1);
  }
}

const db = await connectToDatabase();

export default db;
