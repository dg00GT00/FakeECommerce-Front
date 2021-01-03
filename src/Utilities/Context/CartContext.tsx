import * as React from "react";
import {BasketRequestManager} from "../../HttpRequests/BasketRequestManager";
import {BasketModel} from "../BasketModel/BasketModel";

const basket = new BasketRequestManager();

export const CartContext = React.createContext({
    amount: 0,
    increaseAmount: (product: BasketModel) => {},
    decreaseAmount: (product: BasketModel) => {}
});

export const CartContextProvider: React.FunctionComponent = props => {
    const [cartAmount, setCartAmount] = React.useState(0);

    const increaseAmount = (product: BasketModel) => {
        basket.addProduct(product);
        setCartAmount(basket.getProductsAmount());
    };

    const decreaseAmount = (product: BasketModel) => {
        basket.removeProduct(product);
        setCartAmount(basket.getProductsAmount());
    };

    return (
        <CartContext.Provider value={{
            increaseAmount,
            decreaseAmount,
            amount: cartAmount
        }}>
            {props.children}
        </CartContext.Provider>
    )
}