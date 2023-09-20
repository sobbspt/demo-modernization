import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PricingServiceV2 } from './pricing.service-v2';
import { PricingService } from './pricing.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PricingService, PricingServiceV2]
})
export class CartModule {}
