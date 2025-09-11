import express from "express";
import cors from "cors";

import { Rotas } from "./src/routes/routes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(Rotas);

export { app };
