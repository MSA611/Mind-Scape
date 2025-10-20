
# Implementing Search Functionality

Here are two ways to implement search functionality in your MERN stack application.

## Method 1: Backend Search (Recommended for large datasets)

In this method, the backend is responsible for filtering the notes based on a search query. This is efficient for large numbers of notes as the database does the searching.

### Backend Changes

**1. Update `backend/src/NoteModel.js` to add a text index:**

A text index allows for efficient searching of string content in MongoDB.

```javascript
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Add a text index to the title and content fields
NoteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("note", NoteSchema);

export default Note;
```

**2. Update `backend/src/note.controller.js` to handle search:**

Modify the `getAllNotes` function to perform a text search if a search query is provided.

```javascript
// backend/src/note.controller.js

import Note from "./NoteModel.js";

export const getAllNotes = async (req, res) => {
  try {
    const { search } = req.query;
    let notes;

    if (search) {
      notes = await Note.find({
        creatorId: req.user._id,
        $text: { $search: search },
      });
    } else {
      notes = await Note.find({ creatorId: req.user._id });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In Finding Data" });
  }
};

// ... rest of the file
```

**3. Update `backend/src/router.js`:**

No changes are needed here, as we are using the existing `/` route with a query parameter.

### Frontend Changes

**1. Update `frontend/src/zustand.js` to send the search query:**

Modify the `fetchNote` function to accept a search query and send it to the backend.

```javascript
// frontend/src/zustand.js

// ...
  fetchNote: async (search = "") => {
    try {
      const res = await axios.get(`/api/note?search=${search}`, {
        withCredentials: true,
      });
      set({ note: res.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },
// ...
```

**2. `frontend/src/Pages/HomePage.jsx`:**

The `HomePage.jsx` is already set up to work with this backend change. It will call `fetchNote` with the search term whenever the input changes.

## Method 2: Frontend Search (Simpler, for small datasets)

In this method, the frontend fetches all notes from the backend and then filters them on the client-side based on the user's search input. This is simpler to implement but can be slow if there are many notes.

### Backend Changes

No changes are required on the backend for this method.

### Frontend Changes

**1. Update `frontend/src/Pages/HomePage.jsx` to filter notes locally:**

```javascript
// frontend/src/Pages/HomePage.jsx

import { Box, Flex, Input, Stack, VStack } from "@chakra-ui/react";
import Nav from "../Components/Nav.jsx";
import NoteFunctions from "../zustand.js";
import { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard.jsx";
import EmptyDB from "../Components/EmptyDB.jsx";
import Loading from "../Components/Loading.jsx";

const HomePage = () => {
  const { fetchNote, note } = NoteFunctions();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNote();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = note.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(note);
    }
  }, [search, note]);

  return (
    <Box minH={"100vh"}>
      <Nav />

      {loading && <Loading />}
      <VStack>
        <Input
          placeholder="Search Title or Content"
          value={search}
          w={"lg"}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
        />
      </VStack>
      <VStack>{filteredNotes.length === 0 && !loading ? <EmptyDB /> : null}</VStack>
      <Flex
        alignItems={"flex-start"}
        p={"6"}
        flexWrap={"wrap"}
        gap={"12"}
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
      >
        {filteredNotes.map((note) => {
          return <NoteCard note={note} key={note._id} />;
        })}
      </Flex>
    </Box>
  );
};

export default HomePage;
```

**2. `frontend/src/zustand.js`:**

No changes are needed in `zustand.js` for this method.
