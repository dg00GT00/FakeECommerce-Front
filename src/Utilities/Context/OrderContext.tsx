import * as React from "react";
import {ShippingModel} from "../OrderModel/ShippingModel";
import {OrderModel} from "../OrderModel/OrderModel";
import {OrdersRequestsManager} from "../../HttpRequests/OrdersRequestsManager";
import {userAuth} from "./AuthContext";

const orders = new OrdersRequestsManager();

export const OrderContext = React.createContext({
    getShippingOptionsAsync: () => ({} as Promise<ShippingModel[]>),
    postOrderAsync: async (jwtCacheKey: string, deliveryMethodId: number) => ({} as Promise<OrderModel>),
});

export const OrderContextProvider: React.FunctionComponent = props => {
    orders.setUserInfo(userAuth);
    console.log("Inside order context");
    return (
        <OrderContext.Provider value={{
            getShippingOptionsAsync: () => orders.getShippingOptionsAsync(),
            postOrderAsync: (jwtCacheKey, deliveryMethodId) => orders.postOrderAsync(jwtCacheKey, deliveryMethodId)
        }}>
            {props.children}
        </OrderContext.Provider>
    );
}