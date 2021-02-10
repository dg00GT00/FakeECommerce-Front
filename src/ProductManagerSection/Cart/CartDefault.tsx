import * as React from "react";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import IconButton from "@material-ui/core/IconButton";
import Badge, {BadgeProps} from "@material-ui/core/Badge/Badge";
import {BasketContext} from "../../Utilities/Context/BasketContext";
import {useCheckoutRoute} from "../../Utilities/CustomHooks/CheckoutRoute/useCheckoutRoute";
import {ButtonClassKey, ButtonProps} from "@material-ui/core/Button/Button";
import {SvgIconClassKey} from "@material-ui/core";

type CartDefaultProps = {
    iconClasses?: Partial<Record<SvgIconClassKey, string>>
    buttonClasses?: Partial<Record<ButtonClassKey, string>>
    classNameIcon?: string,
    classNameButton?: string,
    hideWhenZero?: boolean,
    style?: { [i: string]: string | number }
    onClick?: React.MouseEventHandler;
    colorButton?: ButtonProps["color"]
    colorBadge?: BadgeProps["color"],
}

export const CartDefault: React.FunctionComponent<CartDefaultProps> = ({colorBadge = "secondary", ...props}) => {
    const {totalAmount} = React.useContext(BasketContext);
    let handleClick = useCheckoutRoute();

    if (props.onClick) {
        handleClick = props.onClick;
    }

    let cart: JSX.Element | null = (
        <IconButton className={props.classNameButton}
                    classes={props.buttonClasses}
                    onClick={handleClick}
                    aria-label={"shopping cart"}
                    color={props.colorButton}
                    style={props.style}>
            <Badge badgeContent={totalAmount} color={colorBadge}>
                <ShoppingCartRounded className={props.classNameIcon} classes={props.iconClasses}/>
            </Badge>
        </IconButton>
    );

    if (props.hideWhenZero !== undefined && props.hideWhenZero) {
        cart = totalAmount > 0 ? cart : null;
    }
    return cart;
}