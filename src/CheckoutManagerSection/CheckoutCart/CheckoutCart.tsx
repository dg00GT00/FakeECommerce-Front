import * as React from "react";
import {ListItem} from "@material-ui/core";
import {CartContext} from "../../Utilities/Context/CartContext";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import styles from "./CheckoutCart.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge/Badge";

const listStyles = makeStyles({
    listItem: {
        display: "grid"
    },
    listRoot: {
        margin: "0 auto"
    }
})

export const CheckoutCart: React.FunctionComponent = () => {
    const {getTotalProducts, clearItemsById, getAmountById} = React.useContext(CartContext);
    const styleList = listStyles();

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
                        $ {basket.price}
                    </p>
                    <Button className={styles.clear}
                            variant={"outlined"}
                            onClick={_ => clearItemsById(basket.id)}>Remove</Button>
                </ListItem>
            );
        })
    );

    return (
        <List className={[styleList.listRoot, styles.items].join(" ")}>
            {productList}
        </List>
    );
}