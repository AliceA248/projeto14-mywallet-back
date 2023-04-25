import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transaction.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(transactionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});