import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AppointmentService {
  async createAppointment(doctorId, patientId, data) {
    const appointment = await prisma.appointment.create({
      data: {
        endTime: data.endTime,
        status: data.status,
        doctor: {
          connect: { id: doctorId },
        },
        patient: {
          connect: { id: patientId },
        },
      },
    });
    return appointment;
  }

  async getAllAppointments() {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: {
          select: {
            fullName: true,
            specialty: true,
          },
        },
        patient: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });
    return appointments;
  }

  async getAppointmentsByDoctorId(doctorId) {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
      },
      include: {
        doctor: {
          select: {
            fullName: true,
            specialty: true,
          },
        },
        patient: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });
    return appointments;
  }
}

export { AppointmentService };
