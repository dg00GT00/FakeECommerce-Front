import {api} from "./AxiosInstance";
import {AxiosError} from "axios";
import {BasketPaymentModel} from "../Utilities/BasketModel/BasketModel";
import {UserRequestManager} from "./UserRequestManager";
import {PaymentSubject} from "../Utilities/PaymentObserver/PaymentSubject";
import {WebSocketManager} from "./WebSocketManager";

export class PaymentRequestManager {
    public paymentSubject = new PaymentSubject();
    private _socket = new WebSocketManager();

    constructor(private _userRequest: UserRequestManager) {
    }

    public async getPaymentIntentAsync(): Promise<BasketPaymentModel> {
        try {
            const basketId = this._userRequest.jwtManager.getJwtCacheKey();
            const response = await api.post<BasketPaymentModel>(`/payments/${basketId}`,
                {},
                this._userRequest.jwtManager.getJwtAuthorizationHeaders());
            return response.data;
        } catch (e) {
            const error = (e as AxiosError).response;
            return Promise.reject({statusCode: error?.status, message: error?.data});
        }
    }

    public connectPaymentProcessing(): void {
        console.log("The socket message listener before connecting: ", this._socket.socket?.onmessage);
        this._socket.connect<string>(data => {
            console.log("The socket message listener after connecting: ", this._socket.socket?.onmessage);
            let dataConverted = false;
            if (data.toLowerCase() === "true") dataConverted = true;
            console.log("The data received from websocket api: ", dataConverted);
            this.paymentSubject.notifyPaymentProcessingStatus(!dataConverted);
        });
    }

    public disconnectPaymentProcessing(): void {
        this._socket.disconnect(1000, "Successfully closed the payment processing websocket connection");
    }
}