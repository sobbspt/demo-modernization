import { Injectable } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse } from './domain/cart.domain';
import { MysteriousPricingService } from './legacy-pricing.service';
import { PricingServiceV2 } from './pricing.service-v2';
import { Experiment } from './price-experiment';

@Injectable()
export class CartService {

    constructor(
        private readonly mysteriousPricingService: MysteriousPricingService,
        private readonly pricingServiceV2: PricingServiceV2,
        private readonly experiment: Experiment<CalculatePriceResult>) { }

    calculateCartPrice(cart: Cart): CalculatePriceResult {
        this.experiment.use = () => this.mysteriousPricingService.calculatePrice(cart) // only god knows how it works!
        this.experiment.try = () => this.pricingServiceV2.calculatePrice(cart)

        return this.experiment.run()
    }
}
