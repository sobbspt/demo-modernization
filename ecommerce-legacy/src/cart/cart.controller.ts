import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, ProductCategory } from './domain/cart.domain';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('calculatePrice')
    getCartPrice(@Body() cart: Cart) {
        return this.cartService.calculateCartPrice(cart);
    }
}
