export enum ProductCategory {
    Electronics,
    Clothing,
    Books,
    Other,
}

export class Product {
    constructor(
        public name: string,
        public basePrice: number,
        public quantity: number,
        public category: ProductCategory
    ) { }
}

export class User {
    constructor(
        public id: number,  
        public totalSpent: number,
        public membershipDurationInYears: number
    ) { }
}

export class Cart {
    constructor(
        public products: Product[],
        public user: User,
        public couponCode: string | null
    ) { }
}

export class CartResponse extends Cart {
    public fullPrice: number;
    public totalDiscount: number;
    public couponCodeDiscount: number;
    public totalPrice: number;
}

export type CalculatePriceResult = {
    fullPrice: number;
    totalDiscount: number;
    couponCodeDiscount: number;
    totalPrice: number;
}