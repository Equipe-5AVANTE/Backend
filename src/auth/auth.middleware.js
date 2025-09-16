import { AuthService } from "../services/auth.service.js";

class AuthMiddleware {
  static userAuth(req, res, next) {
    try {
      const token = AuthService.getTokenFromHeader(req);
      const decoded = AuthService.validateToken(token);
     console.log(decoded)
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ mensagem: err.message });
    }
  }

  static doctorAuth(req, res, next) {
    try {
      const token = AuthService.getTokenFromHeader(req);
      const decoded = AuthService.validateToken(token);

      if (decoded.role !== "DOCTOR") {
        return res.status(403).json({ mensagem: "Acesso negado" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ mensagem: err.message });
    }
  }
}

export { AuthMiddleware };
