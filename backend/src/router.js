import express from "express";
import {
  CreateNote,
  DelNote,
  getAllNotes,
  getNote,
  UpdateNote,
} from "./note.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", CreateNote);
router.delete("/:id", DelNote);
router.put("/:id", UpdateNote);

export default router;
