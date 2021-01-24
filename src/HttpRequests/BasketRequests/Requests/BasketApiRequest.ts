import {BasketMemoryRequest} from "./BasketMemoryRequest";
import {JwtManager} from "../../JwtManager";
import {api} from "../../AxiosInstance";
import {BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";
import {AxiosError} from "axios";
import {BasketEvents} from "../BasketEvents";

export class BasketApiRequest extends BasketMemoryRequest {
    private _jwtManager = new JwtManager();
    private _basketUrl = "/basket";
    private _basketId = this._jwtManager.getEmailFromJwt() ?? "";

    public async postBasketToApi(): Promise<void> {
        if (this.basketProducts.length) {
            sessionStorage.setItem(this._basketId, this._basketId);
            try {
                const response = await api.post<BasketPaymentModel>(this._basketUrl, {
                    id: this._basketId,
                    items: this.basketProducts
                });
                this.basketProducts = response.data.items;
                this.basketMediator?.triggerBasketActions(BasketEvents.POST_BASKET_TO_API);
            } catch (e) {
                const error = (e as AxiosError).response;
                return Promise.reject({statusCode: error?.status, message: error?.data});
            }
        }
    }

    public async getBasketFromApi(): Promise<BasketPaymentModel | null> {
        const id = sessionStorage.getItem(this._basketId);
        if (id) {
            try {
                const response = await api.get<BasketPaymentModel>(`${this._basketUrl}?id=${id}`);
                this.basketProducts = response.data.items;
                return response.data;
            } catch (e) {
                const error = (e as AxiosError).response;
                return Promise.reject({statusCode: error?.status, message: error?.data});
            }
        }
        return null;
    }

    public async deleteBasketFromApi(): Promise<void> {
        const id = sessionStorage.getItem(this._basketId);
        try {
            await api.delete(`${this._basketUrl}?id=${id}`);
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }
}