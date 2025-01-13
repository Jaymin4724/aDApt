import { logIn, signUp } from "../controller/authController.js";
import { Router } from "express";

const authRouter = Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);

export { authRouter };
