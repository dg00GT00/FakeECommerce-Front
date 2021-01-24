import {BasketEvents} from "../BasketEvents";

export interface IBasketMediator {
    triggerBasketActions: (basketActions: BasketEvents) => void;
}