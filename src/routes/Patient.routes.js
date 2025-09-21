import e from "express";

import { PatientController } from "../controllers/Patient.controller.js";

const CntrolerPacient = new PatientController();

const PatientRoute = e.Router();

PatientRoute.post('/', CntrolerPacient.create)
PatientRoute.get('/', CntrolerPacient.list)
PatientRoute.patch('/:id', CntrolerPacient.updateLevel)

export {PatientRoute}