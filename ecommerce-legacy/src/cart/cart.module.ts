import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PricingServiceV2 } from './pricing.service-v2';

@Module({
  controllers: [CartController],
  providers: [CartService, PricingServiceV2]
})
export class CartModule {}
