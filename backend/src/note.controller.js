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
    //checking weather the note is title or content empty
    if (!title || !content)
      return res.status(500).json({ message: "Please Fill All The Details" });
    //checking weather both title and content exists

    const contentExists = await Note.findOne({ content });
    const titleExists = await Note.findOne({ title });

    if (titleExists && contentExists)
      return res
        .status(500)
        .json({ message: "Both The Title And Content Exists" });

    //check weather the title exists
    if (titleExists)
      return res.status(500).json({ message: "This Title Already Exits" });

    //check weather the content exists or not
    if (contentExists)
      return res.status(500).json({ message: "This content Already Exists" });

    //saving the note
    const note = new Note({
      creatorId: req.user._id,
      title: title,
      content: content,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error While Create Notes" });
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

    if (!title || !content)
      return res.status(500).json({ message: "Please Fill All the Details" });

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
    res.status.json(500).json({ message: "Error While finding Data" });
  }
};
