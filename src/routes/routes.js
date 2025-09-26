import { Router } from "express";
import { UserRoute } from "./User.routes.js";
import { PatientRoute } from "./Patient.routes.js";
import { AppointmentRoute } from "./Appointment.routes.js";

const Rotas = Router();

//Rotas.use("/paciente", P);
Rotas.use("/", UserRoute)
Rotas.use("/patients", PatientRoute)
Rotas.use("/appointments", AppointmentRoute)

export { Rotas };
