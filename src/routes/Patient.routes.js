import e from "express";

import { PatientController } from "../controllers/Patient.controller.js";
import { AuthMiddleware } from "../auth/auth.middleware.js";
const CntrolerPacient = new PatientController();

const PatientRoute = e.Router();

PatientRoute.post('/', AuthMiddleware.userAuth, CntrolerPacient.create)
PatientRoute.get('/',  AuthMiddleware.userAuth, CntrolerPacient.list,)
PatientRoute.patch('/:id', AuthMiddleware.userAuth, CntrolerPacient.updateLevel)
PatientRoute.patch('/status/:id', AuthMiddleware.userAuth, CntrolerPacient.updateStatus)

export {PatientRoute}