import noteRepository from "../repositories/note.repository";

const noteService = {
  createNoteService: async (noteData: { title: string; content: string; author: string }) => {
    try {
      const createService = await noteRepository.createNote(noteData);
      return createService;
    } catch (error) {
      throw new Error(`Error creating note: ${error}`);
    }
  },
  getNotesService: async () => {
    try {
      const getNotesServices = await noteRepository.getNotes();
      return getNotesServices;
    } catch (error) {
      throw new Error(`Error fetching notes: ${error}`);
    }
  },

  updateNotesByIdService: async (id: string, noteData: { title?: string; content?: string; author?: string }) => {
    try {
      const updateService = await noteRepository.updateNotesById(id, noteData);
      return updateService;
    } catch (error) {
      throw new Error(`Error updating note: ${error}`);
    }
  },
  deleteNoteByIdService: async (id: string) => {
    try {
      const deleteService = await noteRepository.deleteNoteById(id);
      return deleteService;
    } catch (error) {
      throw new Error(`Error deleting note: ${error}`);
    }
  },
};
export default noteService;
