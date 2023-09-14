import { Injectable } from '@nestjs/common';
import { CalculatePriceResult, Cart, CartResponse, ProductCategory } from './domain/cart.domain';

@Injectable()
export class CartService {
    getCart(cart: Cart): CartResponse {
        const { fullPrice, totalDiscount, couponCodeDiscount, totalPrice } = this.calculatePrice(cart)
        return {
            ...cart,
            fullPrice,
            totalDiscount,
            couponCodeDiscount,
            totalPrice,
        }
    }

    private calculatePrice(cart: Cart): CalculatePriceResult {
        let totalPrice = 0;
        let couponCodeDiscount = 0;
        let fullPrice = 0;
        let totalDiscount = 0;

        for (const product of cart.products) {
            let productPrice = product.basePrice * product.quantity
            fullPrice += productPrice

            if (product.quantity >= 2) {
                // Apply "Buy 2 get 1" discount
                productPrice -= product.basePrice;
                totalDiscount += product.basePrice
            }

            if (cart.user.totalSpent >= 1000) {
                // Apply "Buy over 1000, get 20% discount" discount
                const over1000Get20PercentAmount = productPrice * 0.2
                productPrice *= 0.8;
                totalDiscount += over1000Get20PercentAmount
            }

            if (cart.user.totalSpent >= 50000) {
                // Apply "Over than 50,000, get 10% discount on top" discount
                const over50000Get10PercentAmount = productPrice * 0.1
                productPrice *= 0.9;
                totalDiscount += over50000Get10PercentAmount
            }

            if (cart.user.membershipDurationInYears >= 2) {
                // Apply "Over than 2 years membership, get 20% on top" discount (rare case)
                const loyaltyDiscount = productPrice * 0.2
                productPrice *= 0.8;
                totalDiscount += loyaltyDiscount
            }

            if (product.category === ProductCategory.Electronics) {
                // Apply additional 5% discount for electronics
                const electronicsCategoryDiscount = productPrice * 0.05
                productPrice *= 0.95;
                totalDiscount += electronicsCategoryDiscount
            } else if (product.category === ProductCategory.Clothing) {
                // Apply additional 10% discount for clothing
                const clothingCategoryDiscount = productPrice * 0.1
                productPrice *= 0.9;
                totalDiscount += clothingCategoryDiscount
            }

            totalPrice += productPrice;
        }

        if (cart.couponCode === "SAVE10") {
            // Apply a coupon code discount of 10%
            const couponDiscountAmount = totalPrice * 0.1
            totalPrice *= 0.9
            couponCodeDiscount += couponDiscountAmount
        }

        return {
            fullPrice: +fullPrice.toFixed(2),
            totalDiscount: +totalDiscount.toFixed(2),
            couponCodeDiscount: +couponCodeDiscount.toFixed(2),
            totalPrice: +totalPrice.toFixed(2),
        }
    }
}


