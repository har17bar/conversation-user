import { Controller, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JoiPipe } from '../Joi.pipe';
import { IUser, UserJoiSchema } from './users.schema';


@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @UsePipes(new JoiPipe(UserJoiSchema))
  @MessagePattern({ service: 'user', slot: 'create' })
  create(@Payload() user: IUser) {
    return this.appService.create(user);
  }
}
