export type BasketModel = {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string
};

export type BasketPaymentModel = {
    id: string;
    items: BasketModel[];
    deliveryMethod?: number;
    clientSecret?: string;
    paymentIntend?: string;
}