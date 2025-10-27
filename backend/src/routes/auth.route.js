import express from "express";
import { Logout, SignIn } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", SignIn);
authRouter.post("/logout", Logout);

export default authRouter;
