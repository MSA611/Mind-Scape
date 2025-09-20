import axios from "axios";
import { create } from "zustand";

const NoteFunctions = create((set) => ({
  note: [],
  setNote: (note) => set({ note }),

  fetchNote: async () => {
    try {
      const res = await axios.get("/api/note");
      set({ note: res.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  createNote: async (newNote) => {
    try {
      const res = await axios.post("/api/note", newNote, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({ note: [...state.note, res.data] }));
      return { success: true, message: "Note Created SuccessFully" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  getNote: async (p_id) => {
    try {
      const res = await axios.get(`/api/note/${p_id}`);
      return {
        success: true,
        data: res.data,
        message: "fetched Data SuccessFully",
      };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  DelNote: async (p_id) => {
    try {
      await axios.delete(`/api/note/${p_id}`);
      set((state) => ({
        note: state.note.filter((note) => note._id !== p_id),
      }));
      return { success: true, message: "Deleted SuccessFully" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  UpdateNote: async (p_id, updatedNote) => {
    try {
      const res = await axios.put(`/api/note/${p_id}`, updatedNote, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        note: state.note.map((note) => (note._id === p_id ? res.data : note)),
      }));
      return { success: true, message: "SuccessFully updated The Note" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },
}));

export default NoteFunctions;
