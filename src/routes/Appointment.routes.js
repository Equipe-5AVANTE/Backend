import { Router } from "express";
import { AppointmentController } from "../controllers/Appointment.controller.js";
import { AuthMiddleware } from "../auth/auth.middleware.js";


const appointmentController = new AppointmentController();

const AppointmentRoute = Router();


AppointmentRoute.post(
  "/:doctorId/:patientId", 
  appointmentController.create
);
AppointmentRoute.get("/",AuthMiddleware.doctorAuth, appointmentController.getAll);
AppointmentRoute.get("/doctor/:doctorId", AuthMiddleware.doctorAuth, appointmentController.getByDoctorId);
AppointmentRoute.put("/:id/finish", AuthMiddleware.doctorAuth, appointmentController.finishAppointment);
export { AppointmentRoute };
