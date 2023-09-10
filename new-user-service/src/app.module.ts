import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
