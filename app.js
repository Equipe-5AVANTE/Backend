import express from "express";
import cors from "cors";
import { Rotas } from "./src/routes/routes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://7l685mtv-5173.brs.devtunnels.ms, https://frontend-ckkn.onrender.com" ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(Rotas);

export { app };
