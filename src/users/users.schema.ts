import { Document, Schema } from 'mongoose';
import * as Joi from '@hapi/joi';

export const UsersSchema = new Schema({
  name: String,
  password: String,
});

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
}

export const UserJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(3).required()
});

