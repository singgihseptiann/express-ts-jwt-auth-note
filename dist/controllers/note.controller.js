"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_service_1 = __importDefault(require("../services/note.service"));
const noteController = {
    createNoteController: async (req, res) => {
        try {
            const newNote = await note_service_1.default.createNoteService(req.body);
            res.status(201).json(newNote);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    // fungsi mendapatkan note
    getNotesController: async (req, res) => {
        try {
            const getNotes = await note_service_1.default.getNotesService();
            if (getNotes.length === 0) {
                // Data kosong
                return res.status(200).json({ message: "No notes found", data: [] });
            }
            // Data ditemukan
            res.status(200).json(getNotes);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    updateNotesByIdController: async (req, res) => {
        try {
            const updateNoteById = await note_service_1.default.updateNotesByIdService(req.params.id, req.body);
            res.status(200).json(updateNoteById);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    //   fungsi delete note by id
    deleteNoteByIdController: async (req, res) => {
        try {
            const deleteNoteById = await note_service_1.default.deleteNoteByIdService(req.params.id);
            if (!deleteNoteById) {
                // Jika catatan tidak ditemukan
                return res.status(404).json({ message: "Note not found" });
            }
            // Penghapusan berhasil
            res.status(200).json({ message: "Note deleted successfully", deletedNote: deleteNoteById });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
};
exports.default = noteController;
