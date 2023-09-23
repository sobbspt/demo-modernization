import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PricingServiceV2 } from './pricing.service-v2';
import { MysteriousPricingService } from './legacy-pricing.service';
import { Experiment } from './price-experiment';

@Module({
  controllers: [CartController],
  providers: [CartService, MysteriousPricingService, PricingServiceV2, Experiment]
})
export class CartModule {}
