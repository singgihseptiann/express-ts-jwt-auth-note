import noteModels from "../models/note.models";

const noteRepository = {
  // fungsi untuk membuat catatan baru
  createNote: async (noteData: { title: string; content: string; author: string }) => {
    try {
      const note = await noteModels.create(noteData);
      return note;
    } catch (error) {
      throw new Error(`Error creating note: ${error}`);
    }
  },

  // fungsi mendapatkan note
  getNotes: async () => {
    try {
      const notes = await noteModels.find();
      return notes;
    } catch (error) {
      throw new Error(`Error fetching notes: ${error}`);
    }
  },

  //   update note berdasarkan id
  updateNotesById: async (id: string, noteData: { title?: string; content?: string; author?: string }) => {
    try {
      const note = await noteModels.findByIdAndUpdate(id, noteData, { new: true });
      if (!note) {
        throw new Error("Note not found");
      }
      return note;
    } catch (error) {
      throw new Error(`Error updating note: ${error}`);
    }
  },

  //   fungsi delete note by id
  deleteNoteById: async (id: string) => {
    try {
      const note = await noteModels.findByIdAndDelete(id);
      if (!note) {
        throw new Error("Note not found");
      }
      return note;
    } catch (error) {
      throw new Error(`Error deleting note: ${error}`);
    }
  },
};
export default noteRepository;
