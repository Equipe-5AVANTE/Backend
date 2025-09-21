import { AppointmentService } from "../services/Appointment.service.js";

const appointmentService = new AppointmentService();

class AppointmentController {
  async create(req, res) {
    try {
      const { doctorId, patientId } = req.params; // IDs do médico e paciente da URL
      const { startTime, endTime, status } = req.body; // Dados do agendamento do corpo da requisição

      if (!doctorId || !patientId || !startTime || !endTime || !status) {
        return res.status(400).json({ error: "Todos os campos (doctorId, patientId, startTime, endTime, status) são obrigatórios." });
      }

      const appointment = await appointmentService.createAppointment(doctorId, patientId, { startTime, endTime, status });
      return res.status(201).json(appointment);
    } catch (error) {
      console.error(error); // Para depuração
      return res.status(500).json({ error: "Ocorreu um erro ao criar o agendamento." });
    }
  }
}

export { AppointmentController };
