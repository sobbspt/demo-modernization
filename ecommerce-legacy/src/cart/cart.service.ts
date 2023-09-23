import { Injectable, Logger } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse } from './domain/cart.domain';
import { MysteriousPricingService } from './legacy-pricing.service';
import { PricingServiceV2 } from './pricing.service-v2';
import { PriceExperiment } from './price-experiment';

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(private readonly mysteriousPricingService: MysteriousPricingService, private readonly pricingServiceV2: PricingServiceV2) { }

    calculateCartPrice(cart: Cart): CalculatePriceResult {
        const experiment = new PriceExperiment<CalculatePriceResult>()
        experiment.use = () => this.mysteriousPricingService.calculatePrice(cart) // only god knows how it works!
        experiment.try = () => this.pricingServiceV2.calculatePrice(cart)

        return experiment.run()
    }
}


