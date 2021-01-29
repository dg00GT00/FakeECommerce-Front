import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketPaymentModel} from "../../Utilities/BasketModel/BasketModel";

export class BasketRequestActions implements IBasketRequestActions {
    private _basketPromise: Promise<BasketPaymentModel | null> = Promise.resolve(null);
    public isBasketEmpty = false;

    public setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>) {
        this._basketPromise = basketPromise;
    }

    public async getBasketAsync(): Promise<BasketPaymentModel | null> {
        return this._basketPromise;
    }
}