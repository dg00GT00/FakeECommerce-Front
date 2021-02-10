import * as React from "react";
import {Drawer, ListItem} from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {BasketContext} from "../../../Utilities/Context/BasketContext";
import {CartDefault} from "../../../ProductManagerSection/Cart/CartDefault";
import List from "@material-ui/core/List/List";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button/Button";
import styles from "./CheckoutDrawer.module.scss";

const drawerStyle = makeStyles((theme: Theme) => ({
    cartRoot: {
        width: "2.5rem",
        height: "auto"
    },
    listRoot: {
        backgroundColor: theme.palette.common.white,
    },
    dividerRoot: {
        backgroundColor: theme.palette.primary.main,
    },
}));

// Needed to use the React.memo in order to this component work properly
export const CheckoutDrawer: React.FunctionComponent = React.memo(props => {
        const {
            getTotalProducts,
            getAmountById,
            clearItemsById,
            getTotalProductCash
        } = React.useContext(BasketContext);

        const [open, setOpen] = React.useState(false);
        const setItems = React.useState<{ [i: number]: number }>({})[1];

        const styleDrawer = drawerStyle();

        const totalProductCash = (): string => getTotalProductCash().toFixed(2);

        const clearBasketItems = (id: number): void => {
            setItems((prevState) => {
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
        };

        const productList = getTotalProducts().map((basket) => {
            return (
                <ListItem
                    key={basket.id}
                    className={styles.item_grid}
                    classes={{root: styleDrawer.listRoot}}>
                    <div className={styles.image}>
                        <img src={basket.pictureUrl} alt={basket.productName}/>
                    </div>
                    <p className={styles.name}>{basket.productName}</p>
                    <p className={styles.price}>$ {basket.price}</p>
                    <p className={styles.quantity}>
                        <span>qty: </span>
                        {getAmountById(basket.id)}
                    </p>
                    <Button
                        className={styles.clear}
                        variant={"outlined"}
                        onClick={_ => clearBasketItems(basket.id)}>
                        Clear Items
                    </Button>
                </ListItem>
            );
        });

        return (
            <>
                <CartDefault classes={{root: styleDrawer.cartRoot}} onClick={_ => setOpen(!open)}/>
                <Drawer anchor={"right"} open={open}>
                    <div className={[styleDrawer.listRoot, styles.modal_container].join(" ")}>
                        <div className={styles.close_button_group}>
                            <IconButton onClick={_ => setOpen(false)} className={styles.close_button}>
                                <CancelRoundedIcon/>
                            </IconButton>
                            <div className={[styles.divider, styleDrawer.dividerRoot].join(" ")}/>
                        </div>
                        <List className={[styleDrawer.listRoot, styles.items].join(" ")}>
                            {productList}
                        </List>
                        <div className={styles.purchase_amount}>
                            {props.children}
                            <div className={[styles.divider, styles.divider_total].join(" ")}/>
                            <h2 className={styles.total}>Total</h2>
                            <h2 className={styles.total_price}>$ {totalProductCash() ?? 0}</h2>
                        </div>
                    </div>
                </Drawer>
            </>
        );
    }
);
