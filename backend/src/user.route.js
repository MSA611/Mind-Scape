import express from "express";
import {
  login,
  logout,
  signup,
  update,
  updateProfile,
} from "./user.controller.js";
import authenticate from "./authenticate.user.js";
import { arcjetMiddleware } from "./arcjet.middleware.js";

const userRouter = express.Router();

userRouter.use(arcjetMiddleware);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/check", authenticate, (req, res) =>
  res.status(200).json(req.user),
);
userRouter.put("/update_profile", authenticate, updateProfile);
userRouter.put("/update", authenticate, update);

export default userRouter;
