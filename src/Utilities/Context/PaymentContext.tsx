import * as React from "react";
import {appBuilder} from "../../HttpRequests/AppBuilder";

const {payment} = appBuilder();

export const PaymentContext = React.createContext({
    setPaymentProcessingStatus: {} as React.Dispatch<React.SetStateAction<boolean>>,
    isPaymentProcessingFinished: ({} as { [value: string]: boolean | undefined }).value,
    connectPaymentProcessing: () => {
    }
});

export const PaymentContextProvider: React.FunctionComponent = props => {
    const [paymentProcessingStatus, setPaymentProcessingStatus] = React.useState(false);

    console.log("The paymentProcessingStatus: ", paymentProcessingStatus);
    React.useEffect(() => {
        payment.paymentSubject.setPaymentProcessingDispatch(setPaymentProcessingStatus);
        if (paymentProcessingStatus) {
            payment.disconnectPaymentProcessing();
        }
    }, [paymentProcessingStatus]);

    return (
        <PaymentContext.Provider value={{
            setPaymentProcessingStatus,
            isPaymentProcessingFinished: paymentProcessingStatus,
            connectPaymentProcessing: () => payment.connectPaymentProcessing()
        }}>
            {props.children}
        </PaymentContext.Provider>
    );
}