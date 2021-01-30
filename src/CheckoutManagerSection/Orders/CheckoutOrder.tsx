import * as React from "react";
import {ListItem} from "@material-ui/core";
import styles from "../CheckoutCart/CheckoutCartBase.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {OrderContext} from "../../Utilities/Context/OrderContext";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {CheckoutCartBase} from "../CheckoutCart/CheckoutCartBase";
import {EmptyItemsCheckoutCart} from "../EmptyCheckoutCart/EmptyItemsCheckoutCart";
import {PaymentStatus} from "./PaymentStatus";

const listStyles = makeStyles((theme: Theme) => ({
    listItem: {
        display: "grid",
    },
    listRoot: {
        margin: "0 auto",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
}));

// "React.memo" avoid the second rerender of this component when changing the inner state
export const CheckoutOrder: React.FunctionComponent = React.memo(() => {
    const {postOrderAsync} = React.useContext(OrderContext);
    const {getBasketItemsAsync} = React.useContext(BasketContext);

    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | JSX.Element[] | null>(null);

    const styleList = listStyles();

    React.useEffect(() => {
        (async () => {
            let order: OrderModel | null = null;
            const basketPaymentModel = await getBasketItemsAsync();

            if (basketPaymentModel?.items.length) {
                order = await postOrderAsync(basketPaymentModel.deliveryMethodId ?? 0);
                const orderComponent = (
                    <ListItem
                        key={order.id}
                        className={[styleList.listItem, styles.item_grid].join(" ")}>
                        <PaymentStatus status={order.status}/>
                    </ListItem>
                );
                setCheckoutComponent(orderComponent);
            } else {
                setCheckoutComponent(
                    <EmptyItemsCheckoutCart message={"You have no order!"}>
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M5 5V7H19V5M10.5 17V14H8L12 10L16 14H13.5V17"/>
                        </svg>
                    </EmptyItemsCheckoutCart>
                );
            }
        })();
    }, [getBasketItemsAsync, postOrderAsync, styleList.listItem]);

    return <CheckoutCartBase cartComponent={checkoutComponent}/>;
});