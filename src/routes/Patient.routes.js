import e from "express";

import { PatientController } from "../controllers/Patient.controller.js";

const instacieCntrolerPacient = new PatientController();

const PatientRoute = e.Router();


