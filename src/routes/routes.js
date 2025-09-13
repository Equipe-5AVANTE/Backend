import { Router } from "express";
import { UserRoute } from "./User.routes.js";

const Rotas = Router();

//Rotas.use("/paciente", P);
Rotas.use("/", UserRoute)

export { Rotas };
