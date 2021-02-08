import {UserRequestManager} from "./UserRequestManager";
import {BasketApiRequest} from "./BasketRequests/Requests/BasketApiRequest";
import {BasketRequestActions} from "./BasketRequests/BasketRequestActions";
import {BasketMediator} from "./BasketRequests/BasketMediator";
import {BasketActions} from "./BasketRequests/BasketActions";
import {OrdersRequestsManager} from "./OrdersRequestsManager";
import {PaymentRequestManager} from "./PaymentRequestManager";

type BasketBuilder = { basketActions: BasketActions; basketApi: BasketApiRequest, payment: PaymentRequestManager };

const generateBasketBuilder = (userRequest: UserRequestManager): BasketBuilder => {
    const basketApi = new BasketApiRequest(userRequest);
    const basketRequestActions = new BasketRequestActions();
    const payment = new PaymentRequestManager(userRequest);
    new BasketMediator(basketApi, basketRequestActions);
    const basketActions = new BasketActions(basketRequestActions, basketApi, payment);
    return {
        basketApi,
        basketActions,
        payment
    };
}

type AppBuilder = () => {
    payment: PaymentRequestManager;
    basketActions: BasketActions;
    auth: UserRequestManager;
    basketApi: BasketApiRequest;
    orders: OrdersRequestsManager
};

const generateAppBuilder = (): AppBuilder => {
    const auth = new UserRequestManager();
    const orders = new OrdersRequestsManager(auth);
    return () => ({
        auth,
        orders,
        ...generateBasketBuilder(auth)
    });
}

export const appBuilder = generateAppBuilder();