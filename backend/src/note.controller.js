import Note from "./NoteModel.js";

export const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find({ creatorId: req.user._id });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In Finding Data" });
  }
};

export const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Please Fill All The Details" });
    }

    const existingNote = await Note.findOne({
      creatorId: req.user._id,
      $or: [{ title }, { content }],
    });

    if (existingNote) {
      if (existingNote.title === title && existingNote.content === content) {
        return res
          .status(400)
          .json({ message: "Both The Title And Content Exists" });
      }
      if (existingNote.title === title) {
        return res.status(400).json({ message: "This Title Already Exists" });
      }
      if (existingNote.content === content) {
        return res.status(400).json({ message: "This Content Already Exists" });
      }
    }

    const note = new Note({
      creatorId: req.user._id,
      title,
      content,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error While Creating Note" });
  }
};

export const DelNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error While Deleting" });
  }
};

export const UpdateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Please Fill All the Details" });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, creatorId: req.user._id },
      { new: true },
    );
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error While Updating" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    return res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error While finding Data" });
  }
};
