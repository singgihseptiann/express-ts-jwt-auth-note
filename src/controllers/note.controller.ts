import { Request, Response } from "express";
import noteService from "../services/note.service";

const noteController = {
  createNoteController: async (req: Request, res: Response) => {
    try {
      const newNote = await noteService.createNoteService(req.body);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // fungsi mendapatkan note
  getNotesController: async (req: Request, res: Response) => {
    try {
      const getNotes = await noteService.getNotesService();

      if (getNotes.length === 0) {
        // Data kosong
        return res.status(200).json({ message: "No notes found", data: [] });
      }

      // Data ditemukan
      res.status(200).json(getNotes);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateNotesByIdController: async (req: Request, res: Response) => {
    try {
      const updateNoteById = await noteService.updateNotesByIdService(req.params.id, req.body);
      res.status(200).json(updateNoteById);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  //   fungsi delete note by id
  deleteNoteByIdController: async (req: Request, res: Response) => {
    try {
      const deleteNoteById = await noteService.deleteNoteByIdService(req.params.id);

      if (!deleteNoteById) {
        // Jika catatan tidak ditemukan
        return res.status(404).json({ message: "Note not found" });
      }

      // Penghapusan berhasil
      res.status(200).json({ message: "Note deleted successfully", deletedNote: deleteNoteById });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default noteController;
