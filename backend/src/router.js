import express from "express";
import {
  CreateNote,
  DelNote,
  getAllNotes,
  getNote,
  UpdateNote,
} from "./note.controller.js";
import authenticate from "./authenticate.user.js";

const router = express.Router();

router.get("/", authenticate, getAllNotes);
router.get("/:id", authenticate, getNote);
router.post("/", authenticate, CreateNote);
router.delete("/:id", authenticate, DelNote);
router.put("/:id", authenticate, UpdateNote);

export default router;
