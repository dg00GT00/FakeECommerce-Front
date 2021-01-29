import * as React from "react";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import List from "@material-ui/core/List/List";
import styles from "./CheckoutCartBase.module.scss";
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
    const {getTotalProductCash} = React.useContext(BasketContext);

    const styleList = listStyles();

    return (
        <div className={styles.container}>
            <List className={[styleList.listRoot, styles.items].join(" ")}>
                {props.cartComponent}
            </List>
            <div className={styles.purchase_amount}>
                {props.children}
                <div className={[styles.divider, styleList.divider].join(" ")}/>
                <h2>Total</h2>
                <h2 className={styles.total_price}>$ {getTotalProductCash().toFixed(2)}</h2>
            </div>
        </div>
    );
};
