import * as React from "react";
import {ListItem} from "@material-ui/core";
import {CartContext} from "../../Utilities/Context/CartContext";
import Button from "@material-ui/core/Button/Button";
import styles from "./CheckoutCart.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge/Badge";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {EmptyCheckoutCart} from "../EmptyCheckoutCart/EmptyCheckoutCart";
import {CheckoutCartBase} from "./CheckoutCartBase";

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

export const CheckoutCart: React.FunctionComponent = () => {
    const {
        shippingValue,
        basketItemsAsync,
        clearItemsById,
        getAmountById,
        getTotalProductCash,
        getTotalProductCashById,
    } = React.useContext(CartContext);

    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | JSX.Element[] | null>(null);

    const styleList = listStyles();
    let subTotalPurchaseAmount = getTotalProductCash();

    React.useEffect(() => {
        basketItemsAsync()
            .then(products => {
                if (products) {
                    const productsList = products.map(basket => {
                        return (
                            <ListItem
                                key={basket.id}
                                className={[styleList.listItem, styles.item_grid].join(" ")}>
                                <div className={styles.image}>
                                    <Badge
                                        color={"secondary"}
                                        badgeContent={basket.quantity}
                                        className={styles.badge}>
                                        <img src={basket.pictureUrl} alt={basket.productName}/>
                                    </Badge>
                                </div>
                                <p className={styles.name}>{basket.productName}</p>
                                <p className={styles.price}>
                                    $ {basket.price.toFixed(2)}
                                </p>
                                <Button
                                    className={styles.clear}
                                    variant={"outlined"}
                                    onClick={_ => clearItemsById(basket.id)}>
                                    Remove
                                </Button>
                            </ListItem>
                        );
                    });
                    setCheckoutComponent(productsList);
                } else {
                    setCheckoutComponent(<EmptyCheckoutCart/>);
                }
            });
    }, [basketItemsAsync, getAmountById, getTotalProductCashById, clearItemsById, styleList.listItem]);


    return (
        <CheckoutCartBase cartComponent={checkoutComponent}>
            <div className={[styles.divider, styleList.divider].join(" ")}/>
            <p className={styles.subtotal}>Subtotal</p>
            <p className={styles.subtotal_price}>
                $ {subTotalPurchaseAmount.toFixed(2)}
            </p>
            <p className={styles.shipping}>Shipping</p>
            <p className={styles.shipping_price}>
                {shippingValue
                    ? `$ ${shippingValue}`
                    : "Calculated in the current step"}
            </p>
        </CheckoutCartBase>
    );
};
