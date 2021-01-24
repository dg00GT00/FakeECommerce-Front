import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";
import {BasketApiRequest} from "./Requests/BasketApiRequest";
import {BasketModel} from "../../Utilities/BasketModel/BasketModel";

/**
 * Delimiters concrete basket actions
 */
export class BasketActions {
    constructor(private _basketRequestActions: IBasketRequestActions,
                private _basketApi: BasketApiRequest) {
    }

    /**
     * Manages the state of customer basket from the api
     * Automatically posts and retrieves the products from cache
     */
    public async basketItemsAsync(): Promise<BasketModel[] | null> {
        await this._basketApi.postBasketToApi();
        const basket = await this._basketRequestActions.getBasketAsync();
        if (this._basketRequestActions.isBasketEmpty) {
            this._basketRequestActions.isBasketEmpty = false;
            await this._basketApi.deleteBasketFromApi();
            return null;
        }
        if (!basket) {
            await this._basketApi.getBasketFromApi();
        }
        return this._basketApi.basketProducts.length ? this._basketApi.basketProducts : null;
    }
}