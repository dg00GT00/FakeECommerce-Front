import * as React from "react";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import {CartContext} from "./CartContext";

type CartDefaultProps = {
    classNameIcon?: string,
    classNameButton?: string,
    hideWhenZero?: boolean,
    style?: { [i: string]: string | number }
    colorButton?: "inherit" | "primary" | "secondary" | "default" | undefined,
    colorBadge?: "error" | "primary" | "secondary" | "default" | undefined,
}

export const CartDefault: React.FunctionComponent<CartDefaultProps> = ({colorBadge = "secondary", ...props}) => {
    const cartContext = React.useContext(CartContext);

    let cart: JSX.Element | null = (
        <IconButton className={props.classNameButton} aria-label={"shopping cart"} color={props.colorButton}
                    style={props.style}>
            <Badge badgeContent={cartContext.amount} color={colorBadge}>
                <ShoppingCartRounded className={props.classNameIcon}/>
            </Badge>
        </IconButton>
    );

    if (props.hideWhenZero !== undefined && props.hideWhenZero) {
        cart = cartContext.amount > 0 ? cart : null;
    }
    return cart
}