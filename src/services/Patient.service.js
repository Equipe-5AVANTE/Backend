import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PatientService {
  async createPatiente(data) {
    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        reason: data.reason,
        level: data.level,
        status: data.status,
      },
    });
    return patient;
  }

  async getAllPatineteOrder() {
    const patients = await prisma.patient.findMany({
      orderBy: [
        {
          status: 'desc',
        },
        {
          level: 'desc',
        },
      ],
    });
    return patients;
  }

  async getFiltersPatientes(filterType) {
    let whereClause = {};

    switch (filterType) {
      case 'triage':
        whereClause = { level: 0 };
        break;
      case 'doctor':
        whereClause = { level: { not: 0 }, status: { not: 2 } };
        break;
      case 'attended':
        whereClause = { status: 2 };
        break;
      default:
        // Se nenhum filtro for especificado, retorna todos os pacientes com a ordenação padrão
        return this.getAllPatineteOrder();
    }

    const patients = await prisma.patient.findMany({
      where: whereClause,
      orderBy: [
        { status: 'desc' },
        { level: 'desc' },
      ],
    });
    return patients;
  }

   async updateLevelPatientes(id, newLevel) {
    const updatedPatient = await prisma.patient.update({
    
      where: { id: String(id)},
      data: { level: newLevel },
    });
    return updatedPatient;
  }

}

export { PatientService };
