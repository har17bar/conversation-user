import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern('getHello')
  getHello() {
    return this.appService.getHello();
  }
}
