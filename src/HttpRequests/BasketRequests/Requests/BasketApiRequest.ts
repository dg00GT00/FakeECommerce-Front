import {BasketMemoryRequest} from "./BasketMemoryRequest";
import {BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";
import {BasketEvents} from "../BasketEvents";
import {AxiosError} from "axios";
import {api} from "../../AxiosInstance";

export class BasketApiRequest extends BasketMemoryRequest {
    private _basketUrl = "/basket";
    private _jwtCacheKey = ""

    public async setJwtCacheKeyAsync(cacheKey: string): Promise<void> {
        this._jwtCacheKey = cacheKey;
    }

    public async postBasketToApi(): Promise<void> {
        if (this.basketProducts.length) {
            sessionStorage.setItem(this._jwtCacheKey, this._jwtCacheKey);
            try {
                const response = await api.post<BasketPaymentModel>(this._basketUrl, {
                    id: this._jwtCacheKey,
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
        const id = sessionStorage.getItem(this._jwtCacheKey);
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
        const id = sessionStorage.getItem(this._jwtCacheKey);
        sessionStorage.removeItem(this._jwtCacheKey);
        try {
            await api.delete(`${this._basketUrl}?id=${id}`);
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }
}