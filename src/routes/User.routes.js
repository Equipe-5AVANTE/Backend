import e from "express";
import { UserController } from "../controllers/User.controller.js";
import { AuthMiddleware } from "../auth/auth.middleware.js";

const UserRoute = e.Router();

UserRoute.post("/user", UserController.createUser);
UserRoute.post("/login", UserController.loginUser);
UserRoute.get("/check", AuthMiddleware.userAuth, UserController.checkUser);
UserRoute.get("/usersAll", UserController.getAllUsers);
UserRoute.put("/:id", AuthMiddleware.doctorAuth, UserController.updateUser);
UserRoute.delete("/:id", AuthMiddleware.doctorAuth, UserController.deleteUser);

export { UserRoute };
