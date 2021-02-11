import {AxiosError} from "axios";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {UserRequestManager} from "./UserRequestManager";
import {ShippingModel} from "../Utilities/OrderModel/ShippingModel";
import {OrderModel} from "../Utilities/OrderModel/OrderModel";
import {api} from "./AxiosInstance";

export type OrderError = Omit<ErrorModel, "error">;

export class OrdersRequestsManager {
    constructor(private _userRequest: UserRequestManager) {
    }

    private _orderSessionKey(): string | never {
        if (this._userRequest.jwtManager.jwt) {
            return this._userRequest.jwtManager.jwt;
        } else {
            throw new Error("No jwt found to set a session key");
        }
    }

    public async getShippingOptionsAsync(): Promise<ShippingModel[]> {
        try {
            const shippingOptions = await api.get<ShippingModel[]>("/orders/deliveryMethods", this._userRequest.jwtManager.getJwtAuthorizationHeaders());
            return shippingOptions.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            if (error?.status === 401) {
                // Unauthorized user error
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
            sessionStorage.setItem(this._orderSessionKey(), order.id.toString());
            return order;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }

    public async getCurrentOrderAsync(): Promise<OrderModel | null> {
        const orderId = sessionStorage.getItem(this._orderSessionKey());
        if (orderId) {
            sessionStorage.removeItem(this._orderSessionKey());
            try {
                const response = await api.get<OrderModel>(
                    `/orders/${orderId}`,
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