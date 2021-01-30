import {UserAddressModel} from "../UserModels/UserAddressModel";
import {ShippingModel} from "./ShippingModel";

export enum PaymentStatusEnum {
    Pending = "Pending",
    PaymentReceived = "Payment Received",
    PaymentFailed = "Payment Failed"
}

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
    status: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: UserAddressModel;
    deliveryMethod: ShippingModel;
    orderItems: OrderItem;
    subTotal: number;
    paymentIntentId: string;
    id: number;
}