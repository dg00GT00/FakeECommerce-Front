import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketModel, BasketPaymentModel} from "../../Utilities/BasketModel/BasketModel";

export class BasketRequestActions implements IBasketRequestActions {
    private _basketPromise: Promise<BasketPaymentModel | null> = Promise.resolve(null);
    public isBasketEmpty = false;

    setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>) {
        this._basketPromise = basketPromise;
    }

    async getBasketAsync(): Promise<BasketModel[] | null> {
        return (await this._basketPromise)?.items ?? null;
    }
}