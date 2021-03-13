import {BasketMemoryRequest} from "./BasketMemoryRequest";
import {BasketModel, BasketPaymentModel} from "../../../Utilities/BasketModel/BasketModel";
import {UserRequestManager} from "../../UserRequestManager";
import {BasketEvents} from "../BasketEvents";
import {AxiosError} from "axios";
import {api} from "../../AxiosInstance";

type BasketPayload = {
    userEmail: string;
    items: BasketModel[];
    deliveryMethodId?: string;
    clientSecret?: string;
    paymentIntentId?: string;
};

export class BasketApiRequest extends BasketMemoryRequest {
    private _basketUrl = "/basket";

    constructor(private _userRequest: UserRequestManager) {
        super();
    }

    public async postBasketToApi(deliveryMethodId?: number, clientSecret?: string, paymentIntendId?: string): Promise<void>;
    public async postBasketToApi(): Promise<void>;
    public async postBasketToApi(...args: any[]): Promise<void> {
        if (this.basketProducts.length) {
            const basketPayload: BasketPayload = {
                userEmail: this._userRequest.jwtManager.getJwtCacheKey() ?? "",
                items: this.basketProducts
            };
            if (args.length) {
                basketPayload.deliveryMethodId = args[0];
                basketPayload.clientSecret = args[1];
                basketPayload.paymentIntentId = args[2];
            }

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
        const id = this._userRequest.jwtManager.getJwtCacheKey()

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
        const id = this._userRequest.jwtManager.getJwtCacheKey();
        this._userRequest.jwtManager.deleteJwtCacheKey();
        try {
            await api.delete(`${this._basketUrl}?id=${id}`);
            this.basketProducts = [];
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }
}