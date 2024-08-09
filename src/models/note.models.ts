// src/models/note.models.ts
import mongoose, { Document, Schema } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  author: string; // or use a user ID reference if you have User model
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }, // store user ID or username
});

const NoteModel = mongoose.model<INote>("Note", NoteSchema);

export default NoteModel;
