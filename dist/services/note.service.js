"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_repository_1 = __importDefault(require("../repositories/note.repository"));
const noteService = {
    createNoteService: async (noteData) => {
        try {
            const createService = await note_repository_1.default.createNote(noteData);
            return createService;
        }
        catch (error) {
            throw new Error(`Error creating note: ${error}`);
        }
    },
    getNotesService: async () => {
        try {
            const getNotesServices = await note_repository_1.default.getNotes();
            return getNotesServices;
        }
        catch (error) {
            throw new Error(`Error fetching notes: ${error}`);
        }
    },
    updateNotesByIdService: async (id, noteData) => {
        try {
            const updateService = await note_repository_1.default.updateNotesById(id, noteData);
            return updateService;
        }
        catch (error) {
            throw new Error(`Error updating note: ${error}`);
        }
    },
    deleteNoteByIdService: async (id) => {
        try {
            const deleteService = await note_repository_1.default.deleteNoteById(id);
            return deleteService;
        }
        catch (error) {
            throw new Error(`Error deleting note: ${error}`);
        }
    },
};
exports.default = noteService;
