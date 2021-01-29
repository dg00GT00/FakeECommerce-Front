import {UserAddressModel} from "../UserModels/UserAddressModel";
import {ShippingModel} from "./ShippingModel";

type ProductOrdered = {
    productItemId: number;
    productName: string;
    pictureUrl: string;
}

type OrderItem = {
    itemOrdered: ProductOrdered;
    price: number;
    quantity: number;
}

export type OrderModel = {
    status: "Pending" | "Payment Received" | "Payment Failed";
    buyerEmail: string;
    orderDate: string;
    shipToAddress: UserAddressModel;
    deliveryMethod: ShippingModel;
    orderItems: OrderItem;
    subTotal: number;
    paymentIntentId: string;
    id: number;
}