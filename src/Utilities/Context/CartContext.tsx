import * as React from "react";
import {BasketRequestManager} from "../../HttpRequests/BasketRequestManager";
import {BasketModel} from "../BasketModel/BasketModel";

const basket = new BasketRequestManager();

export const CartContext = React.createContext({
    totalAmount: 0,
    getAmountById: (id: number) => Number(),
    increaseAmount: (product: BasketModel) => {},
    decreaseAmount: (product: BasketModel) => {}
});

export const CartContextProvider: React.FunctionComponent = props => {
    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);

    const increaseAmount = (product: BasketModel) => {
        basket.addProduct(product);
        setCartTotalAmount(basket.getProductsAmount());
    };

    const decreaseAmount = (product: BasketModel) => {
        basket.removeProduct(product);
        setCartTotalAmount(basket.getProductsAmount());
    };

    return (
        <CartContext.Provider value={{
            increaseAmount,
            decreaseAmount,
            getAmountById:(id) => basket.getProductAmountById(id),
            totalAmount: cartTotalAmount}}>
            {props.children}
        </CartContext.Provider>
    );
}