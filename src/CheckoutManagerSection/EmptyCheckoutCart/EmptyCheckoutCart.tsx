import * as React from "react";
import {ReactComponent as CartArrowDown} from "../../Assets/cartArrowDown.svg"

export const EmptyCheckoutCart: React.FunctionComponent = () => {
    return (
        <div>
            <p>Your cart is empty!</p>
            <CartArrowDown/>
        </div>
    )
}