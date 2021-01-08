import * as React from "react";
import {BasketRequestManager} from "../../HttpRequests/BasketRequestManager";
import {BasketModel} from "../BasketModel/BasketModel";

const basket = new BasketRequestManager();

export const CartContext = React.createContext({
    totalAmount: 0,
    getTotalProducts: () => [{} as BasketModel],
    getAmountById: (id: number) => Number(),
    clearItemsById: (id: number) => Number(),
    getTotalProductCash: () => Number(),
    getTotalProductCashById: (id: number) => Number(),
    increaseAmount: (product: BasketModel) => {},
    decreaseAmount: (product: BasketModel) => {}
});

export const CartContextProvider: React.FunctionComponent = props => {
    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);

    const increaseAmount = (product: BasketModel): void => {
        basket.addProduct(product);
        setCartTotalAmount(basket.getProductsAmount());
    };

    const decreaseAmount = (product: BasketModel): void => {
        basket.removeProduct(product);
        setCartTotalAmount(basket.getProductsAmount());
    };

    const clearItemsById = (id: number): number => {
        const cleared = basket.clearItemsById(id);
        setCartTotalAmount(basket.getProductsAmount());
        return cleared;
    }

    return (
        <CartContext.Provider value={{
            increaseAmount,
            decreaseAmount,
            clearItemsById,
            getTotalProducts: () => basket.basketProducts,
            getTotalProductCash: () => basket.getTotalProductCash(),
            getTotalProductCashById: (id) => basket.getTotalProductCashById(id),
            getAmountById:(id) => basket.getProductAmountById(id),
            totalAmount: cartTotalAmount || basket.getProductsAmount()
        }}>
            {props.children}
        </CartContext.Provider>
    );
}