import {BasketModel, BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";
import {PaymentRequestManager} from "../../PaymentRequestManager";

export interface IBasketRequestActions {
    isBasketEmpty: boolean;
    paymentRequest: PaymentRequestManager;

    setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>): void;

    getBasketAsync(): Promise<BasketModel[] | null>;
}