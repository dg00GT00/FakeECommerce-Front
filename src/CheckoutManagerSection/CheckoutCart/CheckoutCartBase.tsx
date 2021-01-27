import * as React from "react";
import {CartContext} from "../../Utilities/Context/CartContext";
import List from "@material-ui/core/List/List";
import styles from "./CheckoutCart.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

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

type CheckoutCartBaseProps = {
  cartComponent: JSX.Element | JSX.Element[] | null;
};

export const CheckoutCartBase: React.FunctionComponent<CheckoutCartBaseProps> = props => {
    const {shippingValue, getTotalProductCash,} = React.useContext(CartContext);

    const styleList = listStyles();
    let subTotalPurchaseAmount = getTotalProductCash();

    const getTotalPurchaseAmount = (): string => {
        if (shippingValue) {
            subTotalPurchaseAmount += shippingValue;
        }
        return subTotalPurchaseAmount.toFixed(2);
    };

    return (
        <div className={styles.container}>
            <List className={[styleList.listRoot, styles.items].join(" ")}>
                {props.cartComponent}
            </List>
            <div className={styles.purchase_amount}>
                {props.children}
                <div className={[styles.divider, styleList.divider].join(" ")}/>
                <h2>Total</h2>
                <h2 className={styles.total_price}>$ {getTotalPurchaseAmount()}</h2>
            </div>
        </div>
    );
};
