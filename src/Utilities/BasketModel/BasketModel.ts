export type BasketModel = {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string
};

export type BasketPaymentModel = {
    id: number;
    userEmail: string;
    items: BasketModel[];
    deliveryMethodId?: number;
    clientSecret?: string;
    paymentIntentId?: string;
    shippingPrice?: number;
}