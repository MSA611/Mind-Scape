import express from "express";
import { CreateNote, DelNote, getAllNotes } from "./controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", CreateNote);
router.delete("/:id", DelNote);

export default router;
