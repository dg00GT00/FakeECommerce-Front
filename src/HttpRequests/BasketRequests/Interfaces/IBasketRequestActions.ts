import {BasketModel, BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";

export interface IBasketRequestActions {
    isBasketEmpty: boolean;

    setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>): void;

    getBasketAsync(): Promise<BasketModel[] | null>;
}