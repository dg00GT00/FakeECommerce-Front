import * as React from "react";
import {ListItem} from "@material-ui/core";
import {CartContext} from "../../Utilities/Context/CartContext";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import styles from "./CheckoutCart.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge/Badge";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

const listStyles = makeStyles((theme: Theme) => ({
    listItem: {
        display: "grid"
    },
    listRoot: {
        margin: "0 auto"
    },
    divider: {
        backgroundColor: theme.palette.primary.main
    }
}));

export const CheckoutCart: React.FunctionComponent<{ shippingPrice?: number }> = props => {
    const {
        getTotalProducts,
        clearItemsById,
        getAmountById,
        getTotalProductCash,
        getTotalProductCashById
    } = React.useContext(CartContext);

    const styleList = listStyles();
    let subTotalPurchaseAmount = getTotalProductCash();

    const getTotalPurchaseAmount = () => {
        if (props.shippingPrice) {
            subTotalPurchaseAmount += props.shippingPrice;
        }
        return subTotalPurchaseAmount.toFixed(2);
    }

    const productList = (
        getTotalProducts().map(basket => {
            return (
                <ListItem key={basket.id} className={[styleList.listItem, styles.item_grid].join(" ")}>
                    <div className={styles.image}>
                        <Badge color={"secondary"} badgeContent={getAmountById(basket.id)} className={styles.badge}>
                            <img src={basket.pictureUrl} alt={basket.productName}/>
                        </Badge>
                    </div>
                    <p className={styles.name}>
                        {basket.productName}
                    </p>
                    <p className={styles.price}>
                        $ {getTotalProductCashById(basket.id).toFixed(2)}
                    </p>
                    <Button className={styles.clear}
                            variant={"outlined"}
                            onClick={_ => clearItemsById(basket.id)}>Remove</Button>
                </ListItem>
            );
        })
    );

    return (
        <div className={styles.container}>
            <List className={[styleList.listRoot, styles.items].join(" ")}>
                {productList}
            </List>
            <div className={styles.purchase_amount}>
                <div className={[styles.divider, styleList.divider].join(" ")}/>
                <p className={styles.subtotal}>Subtotal</p>
                <p className={styles.subtotal_price}>$ {subTotalPurchaseAmount.toFixed(2)}</p>
                <p className={styles.shipping}>Shipping</p>
                <p className={styles.shipping_price}>{props.shippingPrice ? `$ ${props.shippingPrice}` : "Calculated in the next steps"}</p>
                <div className={[styles.divider, styleList.divider].join(" ")}/>
                <h3>Total</h3>
                <h3 className={styles.total_price}>$ {getTotalPurchaseAmount()}</h3>
            </div>
        </div>
    );
}