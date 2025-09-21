import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AppointmentService {
  async createAppointment(doctorId, patientId, data) {
    const appointment = await prisma.appointment.create({
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status, // O status é String no seu modelo, então não precisa de parseInt
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
}
const patient = await prisma.patient.findUnique({
  where: { id: "864e301f-0c3c-4468-aab6-e677872a948d" }
});
console.log(patient);

const doctor = await prisma.user.findUnique({
  where: { id: "d8b08881-56c1-47d9-9e99-50cb99a1536a" }
});
console.log(doctor);

export { AppointmentService };
