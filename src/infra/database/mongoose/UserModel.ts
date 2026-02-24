import { model, Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", userSchema);