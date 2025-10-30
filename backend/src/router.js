import express from "express";
import {
  CreateNote,
  DelNote,
  getAllNotes,
  getNote,
  UpdateNote,
} from "./note.controller.js";
import { arcjetMiddleware } from "./arcjet.middleware.js";
import authenticate from "./authenticate.user.js";

const router = express.Router();
router.use(arcjetMiddleware);

router.use(authenticate);
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", CreateNote);
router.delete("/:id", DelNote);
router.put("/:id", UpdateNote);

export default router;
