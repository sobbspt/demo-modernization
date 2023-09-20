import { Injectable, Logger } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse } from './domain/cart.domain';
import { LegacyPricingService } from './legacy-pricing.service';
import { PricingServiceV2 } from './pricing.service-v2';
import { PriceExperiment } from './price-experiment';

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(private readonly legacyPricingService: LegacyPricingService, private readonly pricingServiceV2: PricingServiceV2) { }

    calculateCartPrice(cart: Cart): CalculatePriceResult {
        const experiment = new PriceExperiment()
        experiment.use = () => this.legacyPricingService.calculatePrice(cart)
        experiment.try = () => this.pricingServiceV2.calculatePrice(cart)
        const calculatedPrice = experiment.run();

        return {
            fullPrice: calculatedPrice.fullPrice,
            totalDiscount: calculatedPrice.totalDiscount,
            couponCodeDiscount: calculatedPrice.couponCodeDiscount,
            totalPrice: calculatedPrice.totalPrice,
        }
    }
}


