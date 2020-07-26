import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  IUser } from './users.schema';
import { Payload, RpcException } from '@nestjs/microservices';


@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<IUser>) {}
  async create(@Payload() user: IUser) {
    // ToDo make sure user not exist
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }
}
