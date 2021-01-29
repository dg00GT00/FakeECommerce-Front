import {AxiosError} from "axios";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {UserRequestManager} from "./UserRequestManager";
import {ShippingModel} from "../Utilities/OrderModel/ShippingModel";
import {api} from "./AxiosInstance";
import {OrderModel} from "../Utilities/OrderModel/OrderModel";

export type OrderError = Omit<ErrorModel, "error">;

export class OrdersRequestsManager {
    private _userInfo?: UserRequestManager;

    private _getDefaultHeaders(): { headers: { [i: string]: string } } {
        return {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${this._userInfo?.jwtManager.jwt}`
            }
        };
    }

    public setUserInfo(userInfo: UserRequestManager): void {
        this._userInfo = userInfo;
    }

    public async getShippingOptionsAsync(): Promise<ShippingModel[]> {
        try {
            const shippingOptions = await api.get<ShippingModel[]>("/orders/deliveryMethods", this._getDefaultHeaders());
            return shippingOptions.data as ShippingModel[];
        } catch (e) {
            const error = (e as AxiosError).response;
            if (error?.status === 401) { // Unauthorized error
                // Deleting the jwt forces the user effect login before progress getting the shipping options
                this._userInfo?.jwtManager.deleteJwt();
            }
            return Promise.reject({statusCode: error?.status.toString(), message: error?.data});
        }
    }

    public async postOrderAsync(jwtCacheKey: string, deliveryMethodId: number): Promise<OrderModel> {
        try {
            const userAddress = await this._userInfo?.getUserAddress();
            console.log("Posting the order with user address: ", userAddress);
            const response = await api.post<OrderModel>("/orders", {
                basketId: sessionStorage.getItem(jwtCacheKey),
                deliveryMethodId: deliveryMethodId,
                shipToAddress: userAddress
            }, this._getDefaultHeaders());
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }

    public async getOrdersAsync(): Promise<OrderModel[]> {
        try {
            const response = await api.get<OrderModel[]>("/orders");
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }
}