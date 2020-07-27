import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.schema';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<IUser>) {}

  async create(user: IUser) {
    await this.existenceException(user.name, 'exists');
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(user.password, salt);
    user.salt = salt;
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  async getByName(user: IUser){
    await this.existenceException(user.name, 'notExists');
  }

  async validatePassword(user: IUser) {
    const userFounded = await this.existenceException(user.name, 'notExists');
    const valid = await this.passwordValidation(user.password, userFounded);
    if (!valid) {
      throw new RpcException('Invalid credentials');
    }
  }

  async passwordValidation(password, user) {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async existenceException(name, procedure) {
    const user = await this.userModel.findOne({ name });
    switch (procedure) {
      case 'exists':
        if (user) {
          throw new RpcException('User already exists');
        }
        break;
      case 'notExists':
        if (!user) {
          throw new RpcException('Invalid credentials');
        }
    }
    return user;
  }
}
