import {BasketMemoryRequest} from "./BasketMemoryRequest";
import {BasketModel, BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";
import {BasketEvents} from "../BasketEvents";
import {AxiosError} from "axios";
import {api} from "../../AxiosInstance";

type BasketPayload = {
    id: string;
    items: BasketModel[];
    deliveryMethodId?: string;
    clientSecret?: string;
    paymentIntentId?: string;
};

export class BasketApiRequest extends BasketMemoryRequest {
    private _basketUrl = "/basket";
    private _jwtCacheKey = "";

    public async setJwtCacheKeyAsync(cacheKey: string): Promise<void> {
        this._jwtCacheKey = cacheKey;
    }

    public getJwtCacheKey(): string {
        return this._jwtCacheKey;
    }

    public async postBasketToApi(deliveryMethodId?: number, clientSecret?: string, paymentIntendId?: string): Promise<void>;
    public async postBasketToApi(): Promise<void>;
    public async postBasketToApi(...args: any[]): Promise<void> {
        if (this.basketProducts.length) {
            // sessionStorage.setItem(this._jwtCacheKey, this._jwtCacheKey);
            const basketPayload: BasketPayload = {
                id: this._jwtCacheKey,
                items: this.basketProducts
            };
            if (args.length) {
                basketPayload.deliveryMethodId = args[0];
                basketPayload.clientSecret = args[1];
                basketPayload.paymentIntentId = args[2];
            }
            console.log("Basket payload on post basket: ", basketPayload);
            try {
                const response = await api.post<BasketPaymentModel>(this._basketUrl, basketPayload);
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
        console.log("Inside get basket from api. ID: ", id);
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