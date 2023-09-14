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
                    basePrice: 1000.50,
                    category: ProductCategory.Electronics,
                    quantity: 3,
                }
            ],
            user: {
                id: 1,
                totalSpent: 0,
                membershipDurationInYears: 0
            },
            couponCode: 'SAVE10'
        }

        return this.cartService.getCart(cart);
    }
}
