import { Injectable } from "@nestjs/common";
import { CalculatePriceResult, Cart, Product, ProductCategory, User } from "./domain/cart.domain";

@Injectable()
export class PricingService {
    calculatePrice(cart: Cart): CalculatePriceResult {
        const result: CalculatePriceResult = {
            fullPrice: 0,
            totalDiscount: 0,
            couponCodeDiscount: 0,
            totalPrice: 0,
        };

        const criteriaAndMultipliers = [
            { criteria: (_product: Product, user: User) => user.totalSpent >= 1000, multiplier: 0.8 },
            { criteria: (_product: Product, user: User) => user.totalSpent >= 50000, multiplier: 0.9 },
            { criteria: (_product: Product, user: User) => user.membershipDurationInYears >= 2, multiplier: 0.8 },
            { criteria: (product: Product, _user: User) => product.category === ProductCategory.Electronics, multiplier: 0.95 },
            { criteria: (product: Product, _user: User) => product.category === ProductCategory.Clothing, multiplier: 0.9 },
        ];

        for (const product of cart.products) {
            let productPrice = product.basePrice * product.quantity
            result.fullPrice += productPrice

            if (product.quantity >= 2) {
                productPrice -= product.basePrice;
                result.totalDiscount += product.basePrice
            }

            criteriaAndMultipliers.forEach(({ criteria, multiplier }) => {
                if (criteria(product, cart.user)) {
                    const discount = productPrice * (1 - multiplier)
                    productPrice *= multiplier
                    result.totalDiscount += discount
                }
            });

            result.totalPrice += productPrice;
        }

        if (cart.couponCode === "SAVE10") {
            const couponDiscountAmount = result.totalPrice * 0.1;
            result.totalPrice *= 0.9;
            result.couponCodeDiscount += couponDiscountAmount;
        }

        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                result[key] = +result[key].toFixed(2);
            }
        }

        return result;
    }
}