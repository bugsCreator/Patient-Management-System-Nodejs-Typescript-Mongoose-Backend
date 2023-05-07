import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<User>('User', userSchema);
export type IUserInterface= User;