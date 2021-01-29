import * as React from "react";
import {ListItem} from "@material-ui/core";
import styles from "../CheckoutCart/CheckoutCartBase.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {OrderContext} from "../../Utilities/Context/OrderContext";
import {CartContext} from "../../Utilities/Context/CartContext";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {CheckoutCartBase} from "../CheckoutCart/CheckoutCartBase";
import {AuthContext} from "../../Utilities/Context/AuthContext";

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

export const CheckoutOrder: React.FunctionComponent = () => {
    const {JWT_SESSION_KEY} = React.useContext(AuthContext);
    const {postOrderAsync} = React.useContext(OrderContext);
    const {getBasketItemsAsync} = React.useContext(CartContext);

    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | JSX.Element[] | null>(null);

    const styleList = listStyles();

    React.useEffect(() => {
        (async () => {
            let order: OrderModel | null = null;
            const basketPaymentModel = await getBasketItemsAsync();
            console.log("Basket after payment intent: ", basketPaymentModel);
            if (basketPaymentModel) {
                order = await postOrderAsync(JWT_SESSION_KEY, basketPaymentModel.deliveryMethodId ?? 0);
                console.log("Order: ", order);
                const orderComponent = (
                    <ListItem
                        key={order.id}
                        className={[styleList.listItem, styles.item_grid].join(" ")}>
                        <p>{order.status}</p>
                    </ListItem>
                );
                setCheckoutComponent(orderComponent);
            }
        })();
    }, [getBasketItemsAsync, postOrderAsync, styleList.listItem, JWT_SESSION_KEY]);

    return <CheckoutCartBase cartComponent={checkoutComponent}/>;
}