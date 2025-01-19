import { logIn, signUp, getAllUsers } from "../controller/authController.js";
import { Router } from "express";

const authRouter = Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.get("/users", getAllUsers);

export { authRouter };
