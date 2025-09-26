import { UserService } from "../services/User.service.js";

const userService = new UserService();

export class UserController {
  static async createUser(req, res) {
    try {
      const { fullName, email, password,  specialty, role } = req.body;
      const user = await userService.createUser(fullName, email, password, specialty, role);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ mensagem: err.message });
    }
  }

  static async checkUser(req, res) {
    try {
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];
      const user = await userService.getCheckUsers(token);
      res.json({ mensagem: "Token válido", usuario: user });
    } catch (err) {
      res.status(403).json({ mensagem: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await userService.updateUsers(id, data);
      res.json(user);
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(400).json({ mensagem: err.message });
    }
  }
}
