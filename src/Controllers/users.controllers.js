import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import db from "../database/dabaseConection.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const encryptPassword = bcrypt.hashSync(password, 10);
  
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).send("Email já cadastrado!");
    }
    
    await db.collection("users").insertOne({ name, email, password: encryptPassword });
    return res.status(201).send("created!");
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  
  try {
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      return res.status(404).send("Usuário não encontrado!");
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }
    
    const token = uuid();
    await db.collection("sessions").insertOne({ userId: user._id, token });
    
    return res.status(200).send(token);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}

export async function findUser(req, res) {
  const { email } = req.body;
  
  try {
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      return res.status(404).send("Usuário não encontrado!");
    }
    
    return res.send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}
