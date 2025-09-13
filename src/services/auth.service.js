import jwt from "jsonwebtoken";

const SEGREDO = process.env.JWT_SECRET || "seu_segredo_aqui";

 class AuthService {
  static validateToken(token) {
    if (!token) {
      throw new Error("Token não enviado");
    }

    try {
      return jwt.verify(token, SEGREDO); // retorna o payload decodificado
    } catch {
      throw new Error("Token inválido");
    }
  }

  static getTokenFromHeader(req) {
    const auth = req.headers["authorization"];
    return auth && auth.split(" ")[1]; // retorna só o token
  }
}

export {AuthService}