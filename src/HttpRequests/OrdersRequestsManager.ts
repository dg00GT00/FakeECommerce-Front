import {AxiosError} from "axios";
import {OrderModel} from "../Utilities/OrderModel/OrderModel";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {api} from "./AxiosInstance";
import {UserRequestManager} from "./UserRequestManager";

export type OrderError = Omit<ErrorModel, "error">;

export class OrdersRequestsManager {
    private _userInfo = new UserRequestManager();

    public async getShippingOptions(): Promise<OrderModel[]> {
        try {
            const shippingOptions = await api.get<OrderModel[] | OrderError>("/orders/deliveryMethods", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${this._userInfo.jwtManager.jwt}`
                }
            });
            return shippingOptions.data as OrderModel[];
        } catch (e) {
            const error = (e as AxiosError).response;
            if (error?.status === 401){
                this._userInfo.jwtManager.deleteJwt();
            }
            return Promise.reject({statusCode: error?.status.toString(), message: error?.data} as OrderError);
        }
    }
}