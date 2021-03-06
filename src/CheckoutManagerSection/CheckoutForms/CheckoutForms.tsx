import * as React from "react";
import {Paper, useMediaQuery} from "@material-ui/core";
import {ReactComponent as Logo} from "../../Assets/eCommerceBaseLogo.svg";
import {ReactComponent as FakeCreditCard} from "../../Assets/Checkout/fakeCredictCard.svg";
import {ReactComponent as GPlay} from "../../Assets/Checkout/google-pay-primary-logo.svg";
import {ReactComponent as Paypal} from "../../Assets/Checkout/paypal-seeklogo.com.svg";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {CheckoutCart} from "../CheckoutCart/CheckoutCart";
import {ShippingOptions} from "../ShippingOptions/ShippingOptions";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {NotFound} from "../../Utilities/RouterValidation/NotFound";
import {CheckoutFormHeader} from "./CheckoutFormHeader";
import {CreditCardForms} from "../CreditCardForms/CreditCardForms";
import {CheckoutOrder} from "../Orders/CheckoutOrder";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {OrderContext} from "../../Utilities/Context/OrderContext";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import {PaymentContext} from "../../Utilities/Context/PaymentContext";
import {SuccessfullyPurchase} from "../SuccessfullyPurchase/SuccessfullyPurchase";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";
import {CheckoutDrawer} from "./CheckoutDrawer/CheckoutDrawer";
import styles from "./CheckoutForms.module.scss";

const fakeCardStyle = makeStyles((theme: Theme) => ({
    fakeCard: {
        backgroundColor: theme.palette.primary.dark,
    },
    payPal: {
        backgroundColor: theme.palette.secondary.main,
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    badge: {
        color: "white",
    },
}));

type OrderProps = {
    order: OrderModel,
    clientSecrets?: string;
}

const stripePromise = loadStripe("pk_test_51HpH8pDWWNDRw41cUn4L4N9MGqbiwlRIwinyTAMk4OzPaqLNLctlG5VNeN2q6SNcg89HaGN93R2z4sRfS2NT06RM00XUMtOcXf");

export const CheckoutForms: React.FunctionComponent = () => {
    const mediaQuery = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`);

    const {getBasketItemsAsync} = React.useContext(BasketContext);
    const {postOrderAsync, getCurrentOrderAsync} = React.useContext(OrderContext);
    const {isPaymentProcessingFinished} = React.useContext(PaymentContext);

    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | null>(null);
    const [orderContainer, setOrderContainer] = React.useState<OrderProps | null>(null);

    const styleFakeCard = fakeCardStyle();
    const {location: {pathname}} = useHistory();
    const {path} = useRouteMatch();

    const getCheckoutOrderAsync = React.useCallback(async (): Promise<OrderProps | null> => {
        const basketPaymentModel = await getBasketItemsAsync();
        if (basketPaymentModel?.items.length) {
            return {
                order: await postOrderAsync(basketPaymentModel.deliveryMethodId ?? 0),
                clientSecrets: basketPaymentModel.clientSecret
            };
        }
        if (isPaymentProcessingFinished) {
            const order = await getCurrentOrderAsync();
            if (order) {
                return {order};
            }
        }
        return null;
    }, [getBasketItemsAsync, getCurrentOrderAsync, postOrderAsync, isPaymentProcessingFinished]);

    const shippingPath = `${path}/shipping`;
    const creditCartPath = `${path}/creditcard`;

    React.useEffect(() => {
        if (pathname === shippingPath) {
            setCheckoutComponent(<CheckoutCart/>);
        }
        if (pathname === creditCartPath) {
            getCheckoutOrderAsync()
                .then(order => {
                    setCheckoutComponent(<CheckoutOrder orderModel={order?.order ?? null}/>);
                    setOrderContainer(order);
                });
        }
    }, [path, pathname, getCheckoutOrderAsync, isPaymentProcessingFinished, creditCartPath, shippingPath]);

    return (
        <section className={styles.container}>
            <div className={styles.inner_container}>
                {mediaQuery && (pathname !== creditCartPath) ? <CheckoutDrawer/> : null}
                <div className={styles.checkout_header}>
                    <Logo className={styles.logo}/>
                    <div className={styles.express_checkout}>
                        <div className={styles.tags}>
                            <Paper>
                                <GPlay className={styles.gplay}/>
                            </Paper>
                            <Paper className={styleFakeCard.payPal}>
                                <Paypal className={styles.paypal}/>
                            </Paper>
                            <Paper className={styleFakeCard.fakeCard}>
                                <FakeCreditCard className={styles.fakeCard} style={{height: "inherit"}}/>
                                <p className={styleFakeCard.badge}>FakeCard</p>
                            </Paper>
                        </div>
                    </div>
                    <div className={styles.checkout_forms}>
                        <Switch>
                            <Route exact path={shippingPath}>
                                <CheckoutFormHeader title={"Shipping Options"}>
                                    <ShippingOptions/>
                                </CheckoutFormHeader>
                            </Route>
                            <Route exact path={creditCartPath}>
                                {isPaymentProcessingFinished ?
                                    <SuccessfullyPurchase/> :
                                    <CheckoutFormHeader title={"Credit Card Information"}>
                                        <Elements stripe={stripePromise}>
                                            <CreditCardForms
                                                orderModel={orderContainer?.order ?? null}
                                                clientSecrets={orderContainer?.clientSecrets}/>
                                        </Elements>
                                    </CheckoutFormHeader>}
                            </Route>
                            <Route>
                                <NotFound color={"black"}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            {mediaQuery ?
                null :
                <>
                    <div className={styles.divider_group}>
                        <div className={styles.divider_superior}>
                            <div/>
                            <div className={styleFakeCard.divider}/>
                        </div>
                        <div className={styles.divider_inferior}>
                            <div className={styleFakeCard.divider}/>
                            <div/>
                        </div>
                    </div>
                    <div className={styles.cart}>
                        {checkoutComponent}
                    </div>
                </>
            }
        </section>
    );
};
