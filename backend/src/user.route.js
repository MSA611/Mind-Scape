import express from "express";
import { login, logout, signup } from "./user.controller.js";
import authenticate from "./authenticate.user.js";
import { arcjetMiddleware } from "./arcjet.middleware.js";

const userRouter = express.Router();

userRouter.use(arcjetMiddleware);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/check", authenticate);

export default userRouter;
