import {BasketModel} from "../Utilities/BasketModel/BasketModel";

export class BasketRequestManager {
    private _basketProducts: BasketModel[] = [];

    public getProductsAmount(): number {
        let quantity = 0
        for (const product of this._basketProducts) {
            quantity += product.quantity;
        }
        return quantity;
    }

    public addProduct(product: BasketModel): void {
        for (const p of this._basketProducts) {
            if (p.id === product.id) {
                p.quantity += p.quantity;
                break;
            }
        }
        this._basketProducts.push(product);
    }

    public removeProduct(product: BasketModel): void {
        for (let i = 0; i < this._basketProducts.length; i++) {
            let p = this._basketProducts[i];
            if (p.id === product.id) {
                if (p.quantity > 1) {
                    p.quantity -= p.quantity;
                    return;
                } else {
                    this._basketProducts.splice(i, 1);
                    return;
                }
            }
        }
    }
}