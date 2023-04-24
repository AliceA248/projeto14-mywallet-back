import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import AuthRoutes from "./routes/AuthRoutes.js"

dotenv.config();

// Criação do servidor
const app = express()

// Configurações
app.use(express.json())
app.use(cors())
app.use([AuthRoutes])


  // Deixa o app escutando, à espera de requisições
  const port = process.env.PORT ||  5001;
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

