import {api} from "./AxiosInstance";
import {BasketPaymentModel} from "../Utilities/BasketModel/BasketModel";
import {AxiosError} from "axios";

export class PaymentRequestManager {
    public async getPaymentIntent(basketId: string, jwt: string): Promise<BasketPaymentModel> {
        try {
            const response = await api.post<BasketPaymentModel>(`/payments/${basketId}`, {}, {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data})
        }
    }
}