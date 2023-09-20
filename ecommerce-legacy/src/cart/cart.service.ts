import { Injectable } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse, ProductCategory } from './domain/cart.domain';
import { PricingService } from './pricing.service';

@Injectable()
export class CartService {
    constructor(private readonly pricingService: PricingService) {}

    getCartPrice(cart: Cart): CalculatePriceResult {
        const { fullPrice, totalDiscount, couponCodeDiscount, totalPrice } = this.pricingService.calculatePrice(cart)
        return {
            fullPrice,
            totalDiscount,
            couponCodeDiscount,
            totalPrice,
        }
    }
}


