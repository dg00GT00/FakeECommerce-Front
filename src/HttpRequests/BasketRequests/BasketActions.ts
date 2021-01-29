import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketApiRequest} from "./Requests/BasketApiRequest";
import {BasketModel, BasketPaymentModel} from "../../Utilities/BasketModel/BasketModel";

/**
 * Delimiters concrete basket actions
 */
export class BasketActions {
    constructor(private _basketRequestActions: IBasketRequestActions,
                private _basketApi: BasketApiRequest) {
    }

    /**
     * Manages the state of customer basket from api
     * Automatically posts and retrieves the products from cache
     */
    public async manageBasketItemsAsync(): Promise<BasketPaymentModel | null> {
        console.log("Getting basket items async");
        let basketPaymentModel: BasketPaymentModel | null;
        await this._basketApi.postBasketToApi();
        basketPaymentModel = await this._basketRequestActions.getBasketAsync();
        if (this._basketRequestActions.isBasketEmpty) {
            this._basketRequestActions.isBasketEmpty = false;
            await this._basketApi.deleteBasketFromApi();
            return null;
        }
        if (!basketPaymentModel) {
            console.log("Basket payment model empty. Before getting basket");
            basketPaymentModel = await this._basketApi.getBasketFromApi();
        }
        return basketPaymentModel;
    }

    public async updateBasketPaymentIntentAsync(deliveryMethodId: number, jwt: string): Promise<BasketModel[]> {
        console.log("Updating basket items async");
        const basketId = this._basketApi.getJwtCacheKey();
        await this._basketApi.postBasketToApi(deliveryMethodId);
        const newBasket = await this._basketRequestActions.paymentRequest.getPaymentIntent(basketId, jwt);
        return newBasket.items;
    }
}