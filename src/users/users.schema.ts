import {Document, Schema} from 'mongoose';

export const UsersSchema = new Schema({
  name: String,
  password: String,
});

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
}
