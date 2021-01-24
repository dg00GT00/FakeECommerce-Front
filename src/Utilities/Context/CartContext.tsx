import * as React from "react";
import {BasketActions} from "../../HttpRequests/BasketRequests/BasketActions";
import {BasketModel} from "../BasketModel/BasketModel";
import {BasketRequestActions} from "../../HttpRequests/BasketRequests/BasketRequestActions";
import {BasketApiRequest} from "../../HttpRequests/BasketRequests/Requests/BasketApiRequest";
import {BasketMediator} from "../../HttpRequests/BasketRequests/BasketMediator";

const basketApi = new BasketApiRequest();
const basketRequestActions = new BasketRequestActions();
new BasketMediator(basketApi, basketRequestActions);
const basketActions = new BasketActions(basketRequestActions, basketApi);
console.log("Created the cart context");

export const CartContext = React.createContext({
    totalAmount: 0,
    shippingValue: ({} as { [value: string]: number | null }).value,
    basketItemsAsync: () => Promise.resolve({} as BasketModel[] | null),
    getTotalProducts: () => [{} as BasketModel],
    getAmountById: (id: number) => Number(),
    clearItemsById: (id: number) => Number(),
    getTotalProductCash: () => Number(),
    getTotalProductCashById: (id: number) => Number(),
    setShippingValue: (value: number | null) => {
    },
    increaseAmount: (product: BasketModel) => {
    },
    decreaseAmount: (product: BasketModel) => {
    },
});

export const CartContextProvider: React.FunctionComponent = props => {
    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);
    const [shippingValue, setShippingValue] = React.useState<number | null>(null);

    React.useEffect(() => {
        basketApi
            .getBasketFromApi()
            .then(fullBasket => {
                setCartTotalAmount(fullBasket?.items.length ?? 0);
            })
    }, []);

    const increaseAmount = (product: BasketModel): void => {
        basketApi.addProduct(product);
        setCartTotalAmount(basketApi.getProductsAmount());
    };

    const decreaseAmount = (product: BasketModel): void => {
        basketApi.removeProduct(product);
        setCartTotalAmount(basketApi.getProductsAmount());
    };

    const clearItemsById = (id: number): number => {
        const cleared = basketApi.clearItemsById(id);
        setCartTotalAmount(basketApi.getProductsAmount());
        return cleared;
    };

    return (
        <CartContext.Provider
            value={{
                shippingValue,
                setShippingValue,
                increaseAmount,
                decreaseAmount,
                clearItemsById,
                basketItemsAsync: () => basketActions.basketItemsAsync(),
                getTotalProducts: () => basketApi.basketProducts,
                getTotalProductCash: () => basketApi.getTotalProductCash(),
                getTotalProductCashById: id => basketApi.getTotalProductCashById(id),
                getAmountById: id => basketApi.getProductAmountById(id),
                totalAmount: cartTotalAmount || basketApi.getProductsAmount(),
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};
