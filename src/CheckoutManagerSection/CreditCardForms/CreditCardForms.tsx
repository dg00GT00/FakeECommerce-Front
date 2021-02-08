import * as React from "react";
import {Button, TextField} from "@material-ui/core";
import {useCreditCardFormValidation} from "../../Utilities/CustomHooks/FormValidation/useCreditCardFormValidation";
import {useHistory} from "react-router-dom";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {PaymentMethodCreateParams, StripeElementChangeEvent} from "@stripe/stripe-js";
import {useUserSnackbar} from "../../Utilities/CustomHooks/UserSnackbar/useUserSnackbar";
import {LoadProgressButton} from "../../Utilities/CustomButtons/LoadProgressButton";
import styles from "./CreditCardForms.module.scss";
import {PaymentContext} from "../../Utilities/Context/PaymentContext";
import {BasketContext} from "../../Utilities/Context/BasketContext";

export const CreditCardForms: React.FunctionComponent<{ orderModel: OrderModel | null, clientSecrets?: string }> = props => {
    const {
        validationState: {formState, errorState},
        validationFunctions: {
            blankFieldValidation,
            genericFieldValidation,
        }
    } = useCreditCardFormValidation();

    const {goBack} = useHistory();

    const stripe = useStripe();
    const stripeElements = useElements();

    const [snack, setErrorMessage] = useUserSnackbar();
    const [creditCardValidationError, setCreditCardValidationError] = React.useState<string | null>(null);
    const [formProcessing, setFormProcessing] = React.useState(false);
    const [fullErrorState, setFullErrorState] = React.useState<{ creditCardErrorState: boolean }>({
        creditCardErrorState: true
    });

    const {connectPaymentProcessing} = React.useContext(PaymentContext);
    const {deleteBasketAsync} = React.useContext(BasketContext);

    const setCreditCardErrorMessage = (message: string): void => setErrorMessage({message, severity: "error"});

    const cardNumber = stripeElements?.getElement("cardNumber");
    stripeElements?.getElement("cardExpiry");
    stripeElements?.getElement("cardCvc");

    React.useEffect(() => {
        connectPaymentProcessing();
    }, [connectPaymentProcessing]);

    const successfullyPayment = async (): Promise<void> => {
        await deleteBasketAsync();
        setFormProcessing(false);
    }

    const onChangeHandler = (event: StripeElementChangeEvent): void => {
        if (event.error?.message) {
            setCreditCardValidationError(event.error.message);
            setFullErrorState(prevState => {
                const state = prevState || fullErrorState;
                return {
                    ...state,
                    creditCardErrorState: true
                }
            });
        } else {
            setCreditCardValidationError(null);
            setFullErrorState(prevState => {
                const state = prevState || fullErrorState;
                return {
                    ...state,
                    creditCardErrorState: false
                }
            });
        }
    }

    const submitCreditCard = async (event: React.MouseEvent) => {
        if (props.orderModel) {
            const {buyerEmail, shipToAddress: {city, zipCode, state}} = props.orderModel;

            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                name: formState.username.fieldValue,
                email: buyerEmail,
                address: {
                    city: city,
                    postal_code: zipCode,
                    state: state
                }
            };

            setFormProcessing(true);
            try {
                const paymentMethodReq = await stripe?.createPaymentMethod({
                    type: "card",
                    billing_details: billingDetails,
                    card: cardNumber ?? {token: ""}
                });

                if (paymentMethodReq?.error) {
                    setFormProcessing(false);
                    setCreditCardErrorMessage(paymentMethodReq.error.message ?? "");
                    return;
                }

                const paymentConfirm = await stripe?.confirmCardPayment(props?.clientSecrets ?? "", {
                    payment_method: paymentMethodReq?.paymentMethod?.id
                })

                if (paymentConfirm?.error) {
                    setFormProcessing(false);
                    setCreditCardErrorMessage(paymentConfirm.error.message ?? "");
                    return;
                }

                await successfullyPayment();
            } catch (e) {
                setFormProcessing(false);
                return;
            }
        }
    }

    return (
        <div className={styles.container}>
            <TextField
                required
                className={styles.username}
                label={"Card Username"}
                onChange={event => genericFieldValidation(event, "username")}
                onBlur={event => blankFieldValidation(event, "username")}
                error={formState.username.requiredValidity}
                placeholder={"Credit Card Username"}
                id={"card_name"}
                variant={"outlined"}
                color={"primary"}/>
            <div className={styles.stripe_card}>
                <CardNumberElement onChange={onChangeHandler}/>
            </div>
            <div className={styles.stripe_card}>
                <CardExpiryElement onChange={onChangeHandler}/>
            </div>
            <div className={styles.stripe_card}>
                <CardCvcElement/>
            </div>
            <p className={styles.validation_error}>{creditCardValidationError}</p>
            <div className={styles.nav_buttons}>
                <Button
                    variant={"contained"}
                    disabled={!stripe || formProcessing}
                    onClick={_ => goBack()}>
                    Back
                </Button>
                <LoadProgressButton
                    isLoading={formProcessing}
                    onClick={submitCreditCard}
                    disabled={!stripe || errorState || fullErrorState.creditCardErrorState || formProcessing}
                    variant={"contained"}
                    color={"primary"}>
                    Confirm
                </LoadProgressButton>
            </div>
            {snack}
        </div>
    );
}