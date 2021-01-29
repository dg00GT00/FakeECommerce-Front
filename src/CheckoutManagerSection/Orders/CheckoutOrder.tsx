import * as React from "react";
import {ListItem} from "@material-ui/core";
import styles from "../CheckoutCart/CheckoutCartBase.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {OrderContext} from "../../Utilities/Context/OrderContext";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {CheckoutCartBase} from "../CheckoutCart/CheckoutCartBase";

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
    const {postOrderAsync} = React.useContext(OrderContext);
    const {getBasketItemsAsync} = React.useContext(BasketContext);

    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | JSX.Element[] | null>(null);

    const styleList = listStyles();

    React.useEffect(() => {
        (async () => {
            let order: OrderModel | null = null;
            const basketPaymentModel = await getBasketItemsAsync();

            if (basketPaymentModel) {
                order = await postOrderAsync(basketPaymentModel.deliveryMethodId ?? 0);
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
    }, [getBasketItemsAsync, postOrderAsync, styleList.listItem]);

    return <CheckoutCartBase cartComponent={checkoutComponent}/>;
}