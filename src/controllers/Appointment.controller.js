import { AppointmentService } from "../services/Appointment.service.js";

const appointmentService = new AppointmentService();

class AppointmentController {
  async create(req, res) {
    try {
      const { doctorId, patientId } = req.params; // IDs do médico e paciente da URL
      const { endTime, status } = req.body; // Dados do agendamento do corpo da requisição

      if (!doctorId || !patientId || !status) {
        return res.status(400).json({
          error:
            "Todos os campos (doctorId, patientId, startTime, endTime, status) são obrigatórios.",
        });
      }

      const appointment = await appointmentService.createAppointment(
        doctorId,
        patientId,
        { endTime, status }
      );
      return res.status(201).json(appointment);
    } catch (error) {
      console.error(error); // Para depuração
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao criar o agendamento." });
    }
  }
  async getAll(req, res) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error); // Para depuração
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar os agendamentos." });
    }
  }
  async getByDoctorId(req, res) {
    try {
      const { doctorId } = req.params;

      if (!doctorId) {
        return res
          .status(400)
          .json({ error: "O ID do médico (doctorId) é obrigatório." });
      }

      const appointments = await appointmentService.getAppointmentsByDoctorId(
        doctorId
      );
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error); // Para depuração
      return res.status(500).json({
        error: "Ocorreu um erro ao buscar os agendamentos do médico.",
      });
    }
  }
  // Dentro da sua classe AppointmentController

  async finishAppointment(req, res) {
    try {
      // 1. Pega o ID diretamente da URL. Nenhuma informação do corpo é necessária.
      const { id } = req.params;

      const finishedAppointment = await appointmentService.finishAppointment(
        id
      );

      return res.status(200).json(finishedAppointment);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Agendamento não encontrado." });
      }

      console.error(error); // Log do erro para depuração.
      return res
        .status(500)
        .json({ message: "Erro ao finalizar o agendamento." });
    }
  }
}
export { AppointmentController };
