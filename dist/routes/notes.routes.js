"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const router = (0, express_1.Router)();
// route untuk membuat catatan baru
router.post("/notes", note_controller_1.default.createNoteController);
// route untuk mendapatkan semua catatan
router.get("/notes", note_controller_1.default.getNotesController);
//  route untuk mengupdate catatan
router.put("/notes/:id", note_controller_1.default.updateNotesByIdController);
// route untuk menghapus catatan
router.delete("/notes/:id", note_controller_1.default.deleteNoteByIdController);
exports.default = router;
