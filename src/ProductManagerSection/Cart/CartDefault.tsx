import * as React from "react";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {useCheckoutRoute} from "../../Utilities/CustomHooks/CheckoutRoute/useCheckoutRoute";

type CartDefaultProps = {
    classes?: Partial<Record<"root", string>>
    classNameIcon?: string,
    classNameButton?: string,
    hideWhenZero?: boolean,
    style?: { [i: string]: string | number }
    onClick?: React.MouseEventHandler;
    colorButton?: "inherit" | "primary" | "secondary" | "default" | undefined,
    colorBadge?: "error" | "primary" | "secondary" | "default" | undefined,
}

export const CartDefault: React.FunctionComponent<CartDefaultProps> = ({colorBadge = "secondary", ...props}) => {
    const cartContext = React.useContext(BasketContext);
    let handleClick = useCheckoutRoute();

    if (props.onClick) {
        handleClick = props.onClick;
    }

    let cart: JSX.Element | null = (
        <IconButton className={props.classNameButton}
                    onClick={handleClick}
                    aria-label={"shopping cart"}
                    color={props.colorButton}
                    style={props.style}>
            <Badge badgeContent={cartContext.totalAmount} color={colorBadge}>
                <ShoppingCartRounded className={props.classNameIcon} classes={props.classes}/>
            </Badge>
        </IconButton>
    );

    if (props.hideWhenZero !== undefined && props.hideWhenZero) {
        cart = cartContext.totalAmount > 0 ? cart : null;
    }
    return cart;
}