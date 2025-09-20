import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("note", NoteSchema);

export default Note;
