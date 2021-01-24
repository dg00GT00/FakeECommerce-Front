import {IBasketRequest} from "../Interfaces/IBasketRequest";
import {BasketModel} from "../../../Utilities/BasketModel/BasketModel";
import {IBasketMediator} from "../Interfaces/IBasketMediator";
import {BasketEvents} from "../BasketEvents";

export class BasketMemoryRequest implements IBasketRequest {
    private _basketProducts: BasketModel[] = [];
    public basketMediator?: IBasketMediator;

    public setBasketMediator(mediator: IBasketMediator): void {
        this.basketMediator = mediator;
    }

    get basketProducts(): BasketModel[] {
        return this._basketProducts;
    }

    set basketProducts(value: BasketModel[]) {
        this._basketProducts = value;
    }

    public getTotalProductCash(): number {
        let totalCash = 0;
        for (const product of this._basketProducts) {
            totalCash += product.price;
        }
        return totalCash;
    }

    public getTotalProductCashById(id: number): number {
        let totalCash = 0;
        for (const product of this._basketProducts) {
            if (product.id === id) {
                totalCash = product.quantity * product.price;
            }
        }
        return totalCash;
    }

    public clearItemsById(id: number): number {
        for (const product of this._basketProducts) {
            if (product.id === id) {
                product.quantity = 0;
                this.removeProduct(product);
                break;
            }
        }
        if (!this._basketProducts.length) {
            this.basketMediator?.triggerBasketActions(BasketEvents.EMPTY_BASKET);
        }
        return 0;
    }

    public getProductsAmount(): number {
        let quantity = 0;
        for (const product of this._basketProducts) {
            quantity += product.quantity;
        }
        return quantity;
    }

    public getProductAmountById(id: number): number {
        let quantity = 0;
        for (const product of this._basketProducts) {
            if (product.id === id) {
                quantity = product.quantity;
                break;
            }
        }
        return quantity;
    }

    public addProduct(product: BasketModel): void {
        for (const p of this._basketProducts) {
            if (p.id === product.id) {
                p.quantity += product.quantity;
                return;
            }
        }
        this._basketProducts.push(product);
    }

    public removeProduct(product: BasketModel): void {
        for (let i = 0; i < this._basketProducts.length; i++) {
            let p = this._basketProducts[i];
            if (p.id === product.id) {
                if (p.quantity > 1) {
                    p.quantity -= product.quantity;
                    return;
                } else {
                    this._basketProducts.splice(i, 1);
                    return;
                }
            }
        }
    }
}