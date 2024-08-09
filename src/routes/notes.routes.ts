import { Router } from "express";
import noteController from "../controllers/note.controller";

const router = Router();

// route untuk membuat catatan baru
router.post("/notes", noteController.createNoteController);

// route untuk mendapatkan semua catatan
router.get("/notes", noteController.getNotesController);

//  route untuk mengupdate catatan
router.put("/notes/:id", noteController.updateNotesByIdController);

// route untuk menghapus catatan
router.delete("/notes/:id", noteController.deleteNoteByIdController);

export default router;
