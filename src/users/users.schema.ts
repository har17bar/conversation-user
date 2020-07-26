import { Document, Schema } from 'mongoose';
import * as Joi from '@hapi/joi';

export const UsersSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  salt: String,
});

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
  salt: string;
}

export const UserJoiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  password: Joi.string()
    .min(3)
    .required(),
});
