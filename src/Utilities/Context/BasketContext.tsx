import * as React from "react";
import {AuthContext} from "./AuthContext";
import {appBuilder} from "../../HttpRequests/AppBuilder";
import {BasketModel, BasketPaymentModel} from "../BasketModel/BasketModel";

const {basketApi, basketActions} = appBuilder();

export const BasketContext = React.createContext({
    totalAmount: 0,
    getBasketItemsAsync: () => Promise.resolve({} as BasketPaymentModel | null),
    manageBasketItemsAsync: () => Promise.resolve({} as BasketPaymentModel | null),
    updateBasketPaymentIntentAsync: (deliveryMethodId: number) => Promise.resolve({} as BasketModel[] | null),
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
    const {jwtCacheKey} = React.useContext(AuthContext);

    const [cartTotalAmount, setCartTotalAmount] = React.useState(0);

    // Updates the cart total amount getting the product from cache
    React.useEffect(() => {
        basketApi
            .getBasketFromApi()
            .then(fullBasket => {
                setCartTotalAmount(fullBasket?.items.length ?? 0);
            });
    }, [jwtCacheKey]);

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
        <BasketContext.Provider
            value={{
                increaseAmount,
                decreaseAmount,
                clearItemsById,
                getBasketItemsAsync: () => basketApi.getBasketFromApi(),
                updateBasketPaymentIntentAsync: (deliveryMethodId) => basketActions.updateBasketPaymentIntentAsync(deliveryMethodId),
                manageBasketItemsAsync: () => basketActions.manageBasketItemsAsync(),
                getTotalProducts: () => basketApi.basketProducts,
                getTotalProductCash: () => basketApi.getTotalProductCash(),
                getTotalProductCashById: id => basketApi.getTotalProductCashById(id),
                getAmountById: id => basketApi.getProductAmountById(id),
                totalAmount: cartTotalAmount || basketApi.getProductsAmount(),
            }}>
            {props.children}
        </BasketContext.Provider>
    );
};
