import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, ProductCategory } from './domain/cart.domain';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':id')
    getCart(@Param('id') cartId: number) {
        const cart: Cart = {
            products: [
                {
                    name: 'Product A',
                    basePrice: 3000.50,
                    category: ProductCategory.Electronics,
                    quantity: 3,
                },
                {
                    name: 'Product B',
                    basePrice: 1250.11,
                    category: ProductCategory.Clothing,
                    quantity: 1,
                }
            ],
            user: {
                id: 1,
                totalSpent: 100000,
                membershipDurationInYears: 3
            },
            couponCode: 'SAVE10'
        }

        return this.cartService.getCart(cart);
    }
}
