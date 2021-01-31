import * as React from "react";
import {ListItem} from "@material-ui/core";
import styles from "./CheckoutOrder.module.scss";
import baseStyles from "../CheckoutCart/CheckoutCartBase.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {OrderContext} from "../../Utilities/Context/OrderContext";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {CheckoutCartBase} from "../CheckoutCart/CheckoutCartBase";
import {EmptyItemsCheckoutCart} from "../EmptyCheckoutCart/EmptyItemsCheckoutCart";
import {PaymentStatus} from "./PaymentStatus";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";

const listStyles = makeStyles((theme: Theme) => ({
    listItem: {
        display: "grid",
        gridTemplateColumns: "20% 1fr",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateAreas: "\"id date\"\n\"delivery payment\"",
    },
    listRoot: {
        margin: "0 auto",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
}));

type OrderComponentState = {
    component: JSX.Element | JSX.Element[] | null,
    totalProductCash?: string,
    deliveryMethodPrice?: string
}

// "React.memo" avoid the second rerender of this component when changing the inner state
export const CheckoutOrder = React.memo<{ orderModel: OrderModel | null }>(cmp => {
    const {orderModel: order} = cmp;

    const {postOrderAsync} = React.useContext(OrderContext);
    const {getBasketItemsAsync} = React.useContext(BasketContext);

    const [orderComponent, setOrderComponent] = React.useState<OrderComponentState>({component: null});

    const styleList = listStyles();

    React.useEffect(() => {
        (async () => {
            if (order) {
                const orderDate = new Date(order.orderDate);
                const orderComponent = (
                    <ListItem
                        button
                        key={order.id}
                        className={[styleList.listItem, styles.listItem].join(" ")}>
                        <h2 className={styles.id}>#{order.id}</h2>
                        <p className={styles.date}>{orderDate.toDateString()} - {orderDate.toTimeString()}</p>
                        <p className={styles.delivery}>Delivery: <strong>{order.deliveryMethod.shortName}</strong></p>
                        <div className={styles.payment}>
                            <span>Payment:</span>
                            <PaymentStatus className={styles.p_status} status={order.status}/>
                        </div>
                    </ListItem>
                );

                const shippingPrice = order.deliveryMethod.price;
                setOrderComponent({
                    component: orderComponent,
                    totalProductCash: (order.subtotal + shippingPrice).toString(),
                    deliveryMethodPrice: shippingPrice.toString()
                });
            } else {
                setOrderComponent({
                    component:
                        <EmptyItemsCheckoutCart message={"You have no order!"}>
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M5 5V7H19V5M10.5 17V14H8L12 10L16 14H13.5V17"/>
                            </svg>
                        </EmptyItemsCheckoutCart>
                });
            }
        })();
    }, [getBasketItemsAsync, postOrderAsync, styleList.listItem]);

    return (
        <CheckoutCartBase cartComponent={orderComponent.component} totalProductCash={orderComponent.totalProductCash}>
            <p className={baseStyles.shipping}>Shipping</p>
            <p className={baseStyles.shipping_price}>$ {orderComponent.deliveryMethodPrice}</p>
        </CheckoutCartBase>
    );
});