import * as React from "react";
import {ShippingModel} from "../OrderModel/ShippingModel";
import {OrderModel} from "../OrderModel/OrderModel";
import {appBuilder} from "../../HttpRequests/AppBuilder";

const {orders} = appBuilder();

export const OrderContext = React.createContext({
    getShippingOptionsAsync: async () => ({} as Promise<ShippingModel[]>),
    getCurrentOrderAsync: async () => ({} as Promise<OrderModel | null>),
    postOrderAsync: async (deliveryMethodId: number) => ({} as Promise<OrderModel>),
});

export const OrderContextProvider: React.FunctionComponent = props => {
    return (
        <OrderContext.Provider value={{
            getShippingOptionsAsync: () => orders.getShippingOptionsAsync(),
            postOrderAsync: (deliveryMethodId) => orders.postOrderAsync(deliveryMethodId),
            getCurrentOrderAsync: () => orders.getCurrentOrderAsync()
        }}>
            {props.children}
        </OrderContext.Provider>
    );
}