import {BasketModel} from "../../../Utilities/BasketModel/BasketModel";

export interface IBasketRequest {
    basketProducts: BasketModel[];
    getTotalProductCashById: (id: number) => number;
    getTotalProductCash: () => number;
    getProductsAmount: () => number;
    getProductAmountById: (id: number) => number;
    clearItemsById: (id: number) => number;
    addProduct: (product: BasketModel) => void;
    removeProduct: (product: BasketModel) => void;
}