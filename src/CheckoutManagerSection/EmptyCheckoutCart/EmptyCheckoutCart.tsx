import * as React from "react";
import {ReactComponent as CartArrowDown} from "../../Assets/cartArrowDown.svg"
import styles from "./EmptyCheckoutCart.module.scss";


export const EmptyCheckoutCart: React.FunctionComponent = () => {
    return (
        <div className={styles.container}>
            <p>Your cart is empty!</p>
            <CartArrowDown/>
        </div>
    )
}