import * as React from "react";
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
    cartComponent?: JSX.Element | JSX.Element[] | null;
    totalProductCash?: string;
};

export const CheckoutCartBase: React.FunctionComponent<CheckoutCartBaseProps> = props => {
    const styleList = listStyles();

    return (
        <div className={styles.container}>
            {props.cartComponent ?
                <List className={[styleList.listRoot, styles.items].join(" ")}>
                    {props.cartComponent}
                </List> : null}
            <div className={styles.purchase_amount}>
                {props.children}
                <div className={[styles.divider, styles.divider_total, styleList.divider].join(" ")}/>
                <h2 className={styles.total}>Total</h2>
                <h2 className={styles.total_price}>$ {props.totalProductCash ?? 0}</h2>
            </div>
        </div>
    );
};
