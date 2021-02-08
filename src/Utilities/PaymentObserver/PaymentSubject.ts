import React from "react";

export class PaymentSubject {
    private _dispatch?: React.Dispatch<React.SetStateAction<boolean>>;

    public setPaymentProcessingDispatch(dispatch: React.Dispatch<React.SetStateAction<boolean>>) {
        this._dispatch = dispatch;
    }

    public notifyPaymentProcessingStatus(paymentProcessingStatus: boolean): void {
        if (this._dispatch) {
            this._dispatch(paymentProcessingStatus);
        } else {
            throw new Error("No React state dispatch assigned to processed through payment status notification");
        }
    }
}