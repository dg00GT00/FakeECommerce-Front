import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketModel, BasketPaymentModel} from "../../Utilities/BasketModel/BasketModel";
import {PaymentRequestManager} from "../PaymentRequestManager";

export class BasketRequestActions implements IBasketRequestActions {
    private _basketPromise: Promise<BasketPaymentModel | null> = Promise.resolve(null);
    public paymentRequest = new PaymentRequestManager();
    public isBasketEmpty = false;

    public setBasketPromise(basketPromise: Promise<BasketPaymentModel | null>) {
        this._basketPromise = basketPromise;
    }

    public async getBasketAsync(): Promise<BasketModel[] | null> {
        return (await this._basketPromise)?.items ?? null;
    }
}