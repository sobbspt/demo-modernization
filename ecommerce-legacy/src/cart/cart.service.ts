import { Injectable, Logger } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse } from './domain/cart.domain';
import { PricingService } from './pricing.service';
import { isEqual } from 'lodash'
import { PricingServiceV2 } from './pricing.service-v2';

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(private readonly pricingService: PricingService, private readonly pricingServiceV2: PricingServiceV2) { }

    calculateCartPrice(cart: Cart): CalculatePriceResult {
        const calculatedPrice = this.pricingService.calculatePrice(cart);
        const pricingServiceCalculationResult = this.pricingServiceV2.calculatePrice(cart);

        if (!isEqual(calculatedPrice, pricingServiceCalculationResult)) {
            this.logger.warn(`Prices from the two services do not match. calculatedPrice: ${JSON.stringify(calculatedPrice)} pricingServiceCalculationResult: ${JSON.stringify(pricingServiceCalculationResult)}`);
        }

        return {
            fullPrice: calculatedPrice.fullPrice,
            totalDiscount: calculatedPrice.totalDiscount,
            couponCodeDiscount: calculatedPrice.couponCodeDiscount,
            totalPrice: calculatedPrice.totalPrice,
        }
    }
}


