import {BasketModel} from "../Utilities/BasketModel/BasketModel";

export class BasketRequestManager {
    private _basketProducts: BasketModel[] = [];

    get basketProducts(): BasketModel[] {
        return this._basketProducts;
    }

    public getTotalProductCash(): number {
        let getTotalCash = 0;
        for (const product of this._basketProducts) {
            getTotalCash += product.price;
        }
        return getTotalCash;
    }

    public clearItemsById(id: number): number {
        for (const product of this._basketProducts) {
            if (product.id === id) {
                product.quantity = 0;
                this.removeProduct(product);
                break;
            }
        }
        return 0;
    }

    public getProductsAmount(): number {
        let quantity = 0
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