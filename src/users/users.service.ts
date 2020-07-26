import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<IUser>) {}
  async create(user) {
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(
      user.password,
      salt
    );
    // ToDo make sure user not exist
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
