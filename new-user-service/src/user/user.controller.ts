import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserIgnorePassword, UserService } from './user.service';
import { Prisma, UserRole } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern('ecomm-db.ecomm-db.User')
  async getHello(@Payload() message: Message): Promise<void> {
    var payload = message.payload

    if (payload.op === 'c' || payload.op === 'r') {
      await this.userService.create(payload.after)
      return
    }

    if (payload.op === 'u') {
      await this.userService.update(payload.after)
      return
    }
  }
}

type Message = {
  payload: MessagePayload
}

type MessagePayload = {
  after: UserSyncPayload,
  op: string
}

type UserSyncPayload = {
  id: number,
  username: string,
  email: string,
  password: string,
  fullName: string,
  birthdate?: string,
  role: UserRole
}