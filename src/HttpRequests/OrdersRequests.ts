import {OrderModel} from "../Utilities/OrderModel/OrderModel";
import {api} from "./AxiosInstance";

export class OrdersRequests {
    public async getShippingOptions(): Promise<OrderModel> {
        const options = await api.get<OrderModel>("/orders/deliveryMethods");
        return options.data;
    }
}