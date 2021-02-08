import {AxiosError} from "axios";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {UserRequestManager} from "./UserRequestManager";
import {ShippingModel} from "../Utilities/OrderModel/ShippingModel";
import {OrderModel} from "../Utilities/OrderModel/OrderModel";
import {api} from "./AxiosInstance";

export type OrderError = Omit<ErrorModel, "error">;

export class OrdersRequestsManager {
    private _orderMemory?: OrderModel;

    constructor(private _userRequest: UserRequestManager) {
    }

    public async getShippingOptionsAsync(): Promise<ShippingModel[]> {
        try {
            const shippingOptions = await api.get<ShippingModel[]>("/orders/deliveryMethods", this._userRequest.jwtManager.getJwtAuthorizationHeaders());
            return shippingOptions.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            if (error?.status === 401) { // Unauthorized user error
                // Deleting the jwt forces the user effect login before progress getting the shipping options
                this._userRequest.jwtManager.deleteJwt();
            }
            return Promise.reject({statusCode: error?.status.toString(), message: error?.data});
        }
    }

    public async postOrderAsync(deliveryMethodId: number): Promise<OrderModel> {
        try {
            const userAddress = await this._userRequest.getUserAddressAsync();
            const response = await api.post<OrderModel>("/orders", {
                basketId: this._userRequest.jwtManager.getJwtCacheKey(),
                deliveryMethodId: deliveryMethodId,
                shipToAddress: userAddress
            }, this._userRequest.jwtManager.getJwtAuthorizationHeaders());

            const order = response.data;
            this._orderMemory = order;
            return order;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }

    public async getCurrentOrderAsync(): Promise<OrderModel | null> {
        if (this._orderMemory?.id) {
            try {
                const response = await api.get<OrderModel>(
                    `/orders/${this._orderMemory?.id}`,
                    this._userRequest.jwtManager.getJwtAuthorizationHeaders()
                );
                return response.data;
            } catch (e) {
                const error = (e as AxiosError).response;
                return Promise.reject({statusCode: error?.status, message: error?.data});
            }
        }
        return null;
    }

    public async getOrdersAsync(): Promise<OrderModel[]> {
        try {
            const response = await api.get<OrderModel[]>("/orders", this._userRequest.jwtManager.getJwtAuthorizationHeaders());
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }
}