import { Router } from "express";
import { AppointmentController } from "../controllers/Appointment.controller.js";


const appointmentController = new AppointmentController();

const AppointmentRoute = Router();


AppointmentRoute.post(
  "/:doctorId/:patientId", 
  appointmentController.create
);
AppointmentRoute.get("/", appointmentController.getAll);
AppointmentRoute.get("/doctor/:doctorId", appointmentController.getByDoctorId);

export { AppointmentRoute };
