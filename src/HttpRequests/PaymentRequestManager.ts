import {api} from "./AxiosInstance";
import {BasketPaymentModel} from "../Utilities/BasketModel/BasketModel";
import {AxiosError} from "axios";
import {UserRequestManager} from "./UserRequestManager";

export class PaymentRequestManager {
    constructor(private _userRequest: UserRequestManager) {
    }

    public async getPaymentIntent(): Promise<BasketPaymentModel> {
        try {
            const basketId = this._userRequest.jwtManager.getJwtCacheKey();
            const response = await api.post<BasketPaymentModel>(`/payments/${basketId}`,
                {},
                this._userRequest.jwtManager.getJwtAuthorizationHeaders());
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data})
        }
    }
}