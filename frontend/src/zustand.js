import axios from "axios";
import { create } from "zustand";

const NoteFunctions = create((set) => ({
  loggingIn: false,
  Signing: false,
  authUser: null,
  checkingAuth: true,
  note: [],
  setNote: (note) => set({ note }),

  authenticateUser: async () => {
    try {
      const res = await axios.get("/api/auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  logout: async () => {},

  signup: async (information) => {
    try {
      set({ Signing: true });
      const res = await axios.post("/api/auth/signup", information, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      return { success: true, message: res.data?.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ Signing: false });
    }
  },

  login: async (information) => {
    try {
      set({ loggingIn: true });
      const res = await axios.post("/api/auth/login", information, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      return { success: true, message: res.data?.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    } finally {
      set({ loggingIn: false });
    }
  },

  fetchNote: async () => {
    try {
      const res = await axios.get("/api/note", {
        withCredentials: true,
      });
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
        withCredentials: true,
      });
      set((state) => ({ note: [...state.note, res.data] }));
      return { success: true, message: "Note Created SuccessFully" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  getNote: async (p_id) => {
    try {
      const res = await axios.get(`/api/note/${p_id}`, {
        withCredentials: true,
      });
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
      await axios.delete(`/api/note/${p_id}`, {
        withCredentials: true,
      });
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
        withCredentials: true,
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
