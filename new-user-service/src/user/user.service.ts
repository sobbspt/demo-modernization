import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User, UserRole } from '@prisma/client';
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

  async create(payload: Prisma.UserUncheckedCreateInput): Promise<UserIgnorePassword> {
    return await this.prisma.user.create(
      {
        data: {
          id: payload.id,
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
  }

  async update(payload: Prisma.UserUncheckedUpdateInput): Promise<void> {
    await this.prisma.user.update(
      {
        where: {
          id: payload.id as number,
        },
        data: {
          email: payload.email,
          fullName: payload.fullName,
          username: payload.username,
          password: await bcrypt.hash(payload.password as string, 10),
          birthdate: payload.birthdate,
          role: payload.role
        }
      }
    )
  }
}
