import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketApiRequest} from "./Requests/BasketApiRequest";
import {BasketModel, BasketPaymentModel} from "../../Utilities/BasketModel/BasketModel";
import {PaymentRequestManager} from "../PaymentRequestManager";

/**
 * Delimiters concrete basket actions
 */
export class BasketActions {
    constructor(private _basketRequestActions: IBasketRequestActions,
                private _basketApi: BasketApiRequest,
                private _paymentIntent: PaymentRequestManager) {
    }

    /**
     * Manages the state of customer basket from api
     * Automatically posts and retrieves the products from cache
     */
    public async manageBasketItemsAsync(): Promise<BasketPaymentModel | null> {
        let basketPaymentModel: BasketPaymentModel | null;
        await this._basketApi.postBasketToApi();
        basketPaymentModel = await this._basketRequestActions.getBasketAsync();
        if (this._basketRequestActions.isBasketEmpty) {
            this._basketRequestActions.isBasketEmpty = false;
            await this._basketApi.deleteBasketFromApi();
            return null;
        }
        if (!basketPaymentModel) {
            basketPaymentModel = await this._basketApi.getBasketFromApi();
        }
        return basketPaymentModel;
    }

    public async updateBasketPaymentIntentAsync(deliveryMethodId: number): Promise<BasketModel[]> {
        await this._basketApi.postBasketToApi(deliveryMethodId);
        return (await this._paymentIntent.getPaymentIntent()).items;
    }
}