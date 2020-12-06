import * as React from "react";

export const CartContext = React.createContext({
    amount: 0,
    increaseAmount: () => {
    },
    decreaseAmount: () => {
    }
});

export const CartContextProvider: React.FunctionComponent = props => {
    let [productAmount, setProductAmount] = React.useState(0)

    const increaseAmount = () => setProductAmount(++productAmount)
    const decreaseAmount = () => setProductAmount(--productAmount)

    return (
        <CartContext.Provider value={{
            increaseAmount: increaseAmount,
            decreaseAmount: decreaseAmount,
            amount: productAmount >= 0 ? productAmount : 0
        }}>
            {props.children}
        </CartContext.Provider>
    )
}