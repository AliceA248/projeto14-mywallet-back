import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../database/dabaseConection.js";

export async function newTransaction(req, res) {
  const { authorization } = req.headers;
  const { tipo } = req.params;
  const { value, description } = req.body;
  
  if (!authorization) return res.send(401);
  const token = authorization.replace("Bearer ", "");
  
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.send(401);
    
    const transaction = {
      value,
      description,
      date: dayjs().format("DD/MM"),
      type: tipo,
      idUser: new ObjectId(session.userId)
    };
    
    const result = await db.collection("transactions").insertOne(transaction);
    return res.send(201);
  } catch (err) {
    console.error(err);
    return res.send(500);
  }
}

export async function getTransactions(req, res) {
  const { authorization } = req.headers;
  
  if (!authorization) return res.send(401);
  const token = authorization.replace("Bearer ", "");
  
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.send(401);
    
    const transactions = await db.collection("transactions")
      .find({ idUser: new ObjectId(session.userId) })
      .toArray();
      
    return res.send(transactions);
  } catch (err) {
    console.error(err);
    return res.send(500);
  }
}
