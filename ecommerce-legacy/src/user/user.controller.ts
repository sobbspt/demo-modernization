import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserIgnorePassword, UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserIgnorePassword[]> {
    return this.userService.getUsers();
  }

  @Post()
  createUser(
    @Body() payload: Prisma.UserCreateInput
  ): Promise<UserIgnorePassword> {
    return this.userService.create(payload);
  }
}
