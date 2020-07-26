import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @MessagePattern({ service: 'user', slot: 'create' })
  create(@Payload() user) {
    return this.appService.create(user);
  }
}
