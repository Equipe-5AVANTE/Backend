import { PatientService } from "../services/Patient.service.js";

const patientService = new PatientService();

class PatientController {
  async create(req, res) {
    try {
      const patient = await patientService.createPatiente(req.body);
      return res.status(201).json(patient);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao criar o paciente." });
    }
  }

  async list(req, res) {
    try {
      const { filter } = req.query;
      let patients;

      if (filter) {
        patients = await patientService.getFiltersPatientes(filter);
      } else {
        patients = await patientService.getAllPatineteOrder();
      }
      
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao listar os pacientes." });
    }
  }
   async updateLevel(req, res) {
    try {
      const { id } = req.params;
      console.log(id)
      const { level } = req.body;

      if (level === undefined) {
        return res.status(400).json({ error: "O nível (level) é obrigatório para atualização." });
      }

      const updatedPatient = await patientService.updateLevelPatientes(String(id), level);
      return res.status(200).json(updatedPatient);
    } catch (error) {
      if (error.code === 'P2025') { // Prisma error code for record not found
        return res.status(404).json({ error: "Paciente não encontrado." });
      }
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o nível do paciente." });
    }
  }
}

export { PatientController };
