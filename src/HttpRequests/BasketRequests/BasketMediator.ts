import {IBasketMediator} from "./Interfaces/IBasketMediator";
import {BasketApiRequest} from "./Requests/BasketApiRequest";
import {BasketEvents} from "./BasketEvents";
import {IBasketRequestActions} from "./Interfaces/IBasketRequestActions";

export class BasketMediator implements IBasketMediator {
    private _basketApi: BasketApiRequest;

    constructor(_basketApi: BasketApiRequest, private _basketRequestActions: IBasketRequestActions) {
        this._basketApi = _basketApi;
        this._basketApi.setBasketMediator(this);
    }

    public triggerBasketActions(basketActions: BasketEvents): void {
        switch (basketActions) {
            case BasketEvents.POST_BASKET_TO_API:
                this._basketRequestActions.setBasketPromise(this._basketApi.getBasketFromApi())
                break;
            case BasketEvents.EMPTY_BASKET:
                this._basketRequestActions.isBasketEmpty = true;
                break;
        }
    }
}

