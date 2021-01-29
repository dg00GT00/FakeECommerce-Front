import * as React from "react";
import {BasketActions} from "../../HttpRequests/BasketRequests/BasketActions";
import {BasketModel, BasketPaymentModel} from "../BasketModel/BasketModel";
import {BasketRequestActions} from "../../HttpRequests/BasketRequests/BasketRequestActions";
import {BasketApiRequest} from "../../HttpRequests/BasketRequests/Requests/BasketApiRequest";
import {BasketMediator} from "../../HttpRequests/BasketRequests/BasketMediator";
import {AuthContext} from "./AuthContext";

const basketApi = new BasketApiRequest();
const basketRequestActions = new BasketRequestActions();
new BasketMediator(basketApi, basketRequestActions);
const basketActions = new BasketActions(basketRequestActions, basketApi);

export const CartContext = React.createContext({
    totalAmount: 0,
    getBasketItemsAsync: () => Promise.resolve({} as BasketPaymentModel | null),
    manageBasketItemsAsync: () => Promise.resolve({} as BasketPaymentModel | null),
    updateBasketPaymentIntentAsync: (deliveryMethodId: number, jwt: string) => Promise.resolve({} as BasketModel[] | null),
    getTotalProductCash: () => Number(),
    getTotalProducts: () => [{} as BasketModel],
    getAmountById: (id: number) => Number(),
    clearItemsById: (id: number) => Number(),
    getTotalProductCashById: (id: number) => Number(),
    increaseAmount: (product: BasketModel) => {
    },
    decreaseAmount: (product: BasketModel) => {
    },
});

export const CartContextProvider: React.FunctionComponent = props => {
    const {JWT_SESSION_KEY} = React.useContext(AuthContext);

    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);
    console.log("Inside cart context. JWT: ", JWT_SESSION_KEY);
    // Updates the cart total amount getting the product from cache
    React.useEffect(() => {
        basketApi
            .setJwtCacheKeyAsync(JWT_SESSION_KEY)
            .then(_ => {
                sessionStorage.setItem(JWT_SESSION_KEY, JWT_SESSION_KEY);
                basketApi
                    .getBasketFromApi()
                    .then(fullBasket => {
                        console.log("Updating the basket total amount");
                        setCartTotalAmount(fullBasket?.items.length ?? 0);
                    })
            })
    }, [JWT_SESSION_KEY]);

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
                increaseAmount,
                decreaseAmount,
                clearItemsById,
                getBasketItemsAsync: () => basketApi.getBasketFromApi(),
                updateBasketPaymentIntentAsync: (deliveryMethodId, jwt) => basketActions.updateBasketPaymentIntentAsync(deliveryMethodId, jwt),
                manageBasketItemsAsync: () => basketActions.manageBasketItemsAsync(),
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
