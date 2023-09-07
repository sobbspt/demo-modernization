import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export type UserIgnorePassword = Omit<User, "password">

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserIgnorePassword[]> {
    return await this.prisma.user.findMany({
      select: {
        password: false,
        id: true,
        fullName: true,
        email: true,
        role: true,
        birthdate: true,
        username: true,
      }
    });
  }

  async create(payload: Prisma.UserCreateInput): Promise<UserIgnorePassword> {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create(
        {
          data: {
            email: payload.email,
            fullName: payload.fullName,
            username: payload.username,
            password: await bcrypt.hash(payload.password, 10),
            birthdate: payload.birthdate,
            role: payload.role
          },
          select: {
            password: false,
            id: true,
            fullName: true,
            email: true,
            role: true,
            birthdate: true,
            username: true,
          }
        }
      )

      await tx.userOutbox.create(
        {
          data: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            username: user.username,
            password: await bcrypt.hash(payload.password, 10),
            birthdate: user.birthdate,
            role: user.role
          },
        }
      )

      return user
    })
  }
}
