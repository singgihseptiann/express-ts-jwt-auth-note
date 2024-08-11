"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_models_1 = __importDefault(require("../models/note.models"));
const noteRepository = {
    // fungsi untuk membuat catatan baru
    createNote: async (noteData) => {
        try {
            const note = await note_models_1.default.create(noteData);
            return note;
        }
        catch (error) {
            throw new Error(`Error creating note: ${error}`);
        }
    },
    // fungsi mendapatkan note
    getNotes: async () => {
        try {
            const notes = await note_models_1.default.find();
            return notes;
        }
        catch (error) {
            throw new Error(`Error fetching notes: ${error}`);
        }
    },
    //   update note berdasarkan id
    updateNotesById: async (id, noteData) => {
        try {
            const note = await note_models_1.default.findByIdAndUpdate(id, noteData, { new: true });
            if (!note) {
                throw new Error("Note not found");
            }
            return note;
        }
        catch (error) {
            throw new Error(`Error updating note: ${error}`);
        }
    },
    //   fungsi delete note by id
    deleteNoteById: async (id) => {
        try {
            const note = await note_models_1.default.findByIdAndDelete(id);
            if (!note) {
                throw new Error("Note not found");
            }
            return note;
        }
        catch (error) {
            throw new Error(`Error deleting note: ${error}`);
        }
    },
};
exports.default = noteRepository;
