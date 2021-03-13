import * as React from "react";
import {Drawer, ListItem} from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {BasketContext} from "../../../Utilities/Context/BasketContext";
import {CartDefault} from "../../../ProductManagerSection/Cart/CartDefault";
import {EmptyItemsCheckoutCart} from "../../EmptyCheckoutCart/EmptyItemsCheckoutCart";
import {ReactComponent as CartArrowDown} from "../../../Assets/cartArrowDown.svg";
import List from "@material-ui/core/List/List";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button/Button";
import styles from "./CheckoutDrawer.module.scss";

const drawerStyle = makeStyles((theme: Theme) => ({
    cartRoot: {
        width: "2.5rem",
        height: "auto"
    },
    buttonRoot: {
        justifySelf: "end",
        paddingRight: "30px"
    },
    listRoot: {
        backgroundColor: theme.palette.common.white,
    },
    dividerRoot: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const CheckoutDrawer: React.FunctionComponent = () => {
    const {
        totalAmount,
        getTotalProducts,
        clearItemsById,
        getTotalProductCash,
        manageBasketItemsAsync
    } = React.useContext(BasketContext);

    // The "firstRender" ref avoids the infinite loop of the component
    const firstRender = React.useRef(true);
    const [open, setOpen] = React.useState(false);
    const [checkoutComponent, setCheckoutComponent] = React.useState<JSX.Element | JSX.Element[] | null>(null);
    const setItems = React.useState<{ [i: number]: number }>({})[1];

    const styleDrawer = drawerStyle();

    const totalProductCash = (): string => getTotalProductCash().toFixed(2);

    const clearBasketItems = React.useCallback((id: number): void => {
        firstRender.current = true;
        setItems(prevState => {
            const state = prevState && {};
            const newState = {
                ...state,
                [id]: clearItemsById(id),
            };
            if (getTotalProducts().length === 0) {
                setOpen(false);
            }
            return newState;
        });
    }, [getTotalProducts, clearItemsById, setItems]);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            (async () => {
                const products = await manageBasketItemsAsync();
                if (products && products.items.length) {
                    const productList = products.items.map(basket => {
                        return (
                            <ListItem
                                key={basket.productId}
                                className={styles.item_grid}
                                classes={{root: styleDrawer.listRoot}}>
                                <div className={styles.image}>
                                    <img src={basket.pictureUrl} alt={basket.productName}/>
                                </div>
                                <p className={styles.name}>{basket.productName}</p>
                                <p className={styles.price}>$ {basket.price.toFixed(2)}</p>
                                <p className={styles.quantity}>
                                    <span>qty: </span>
                                    {basket.quantity}
                                </p>
                                <Button
                                    className={styles.clear}
                                    variant={"outlined"}
                                    onClick={_ => clearBasketItems(basket.productId)}>
                                    Clear Items
                                </Button>
                            </ListItem>
                        );
                    });
                    setCheckoutComponent(productList);
                } else {
                    setCheckoutComponent(
                        <EmptyItemsCheckoutCart message={"Your cart is empty!"}>
                            <CartArrowDown/>
                        </EmptyItemsCheckoutCart>
                    );
                }
            })();
        }
    }, [manageBasketItemsAsync, clearBasketItems, totalAmount, styleDrawer.listRoot]);

    return (
        <>
            <CartDefault
                hideWhenZero
                buttonClasses={{root: styleDrawer.buttonRoot}}
                iconClasses={{root: styleDrawer.cartRoot}}
                onClick={_ => setOpen(true)}/>
            <Drawer anchor={"right"} open={open}>
                <div className={[styleDrawer.listRoot, styles.modal_container].join(" ")}>
                    <div className={styles.close_button_group}>
                        <IconButton onClick={_ => setOpen(false)} className={styles.close_button}>
                            <CancelRoundedIcon/>
                        </IconButton>
                        <div className={[styles.divider, styleDrawer.dividerRoot].join(" ")}/>
                    </div>
                    <List className={[styleDrawer.listRoot, styles.items].join(" ")}>
                        {checkoutComponent}
                    </List>
                    <div className={styles.purchase_amount}>
                        <div className={[styles.divider, styles.divider_total].join(" ")}/>
                        <h2 className={styles.total}>Total</h2>
                        <h2 className={styles.total_price}>$ {totalProductCash() ?? 0}</h2>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
