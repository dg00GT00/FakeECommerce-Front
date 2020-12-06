import * as React from "react";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import {CartContext} from "./CartContext";

type CartDefaultProps = {
    className: string,
    color: "inherit" | "primary" | "secondary" | "default" | undefined
}

export const CartDefault: React.FunctionComponent<CartDefaultProps> = props => {
    const cartContext = React.useContext(CartContext);

    return (
        <IconButton aria-label={"shopping cart"} color={props.color}>
            <Badge badgeContent={cartContext.amount} color="secondary">
                <ShoppingCartRounded className={props.className}/>
            </Badge>
        </IconButton>
    )
}