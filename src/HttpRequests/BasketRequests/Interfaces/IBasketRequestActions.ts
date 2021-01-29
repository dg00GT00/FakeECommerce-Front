import {BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";

export interface IBasketRequestActions {
    isBasketEmpty: boolean;

    setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>): void;

    getBasketAsync(): Promise<BasketPaymentModel | null>;
}