import { Schema, model } from "mongoose";
export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

export default model<IUser>("User", userSchema);
