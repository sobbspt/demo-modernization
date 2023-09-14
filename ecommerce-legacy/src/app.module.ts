import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [PrismaModule, CartModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
