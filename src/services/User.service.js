import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SEGREDO = process.env.JWT_SECRET || "seu_segredo_aqui";

class UserService {
  async createUser(fullName, email, password,  specialty, role) {
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) throw new Error("Usuário já existe");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { fullName, email, password: hashedPassword,  specialty,  role },
    });

    return user;
  }

  async loginUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new Error("Senha inválida");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SEGREDO,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async getCheckUsers(token) {
    try {
      return jwt.verify(token, SEGREDO);
    } catch {
      throw new Error("Token inválido");
    }
  }

  async getAllUsers() {
    return prisma.user.findMany(
        
    );
  }

  async updateUsers(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id) {
    return prisma.user.delete({ where: { id } });
  }
}

export { UserService };
