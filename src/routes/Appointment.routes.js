import { Router } from "express";
import { AppointmentController } from "../controllers/Appointment.controller.js";


const appointmentController = new AppointmentController();

const AppointmentRoute = Router();


AppointmentRoute.post(
  "/:doctorId/:patientId", 
  appointmentController.create
);

export { AppointmentRoute };
