import express from "express";
import { Login, Logout, SignIn } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", SignIn);
authRouter.post("/logout", Logout);
authRouter.post("/login", Login);

export default authRouter;
