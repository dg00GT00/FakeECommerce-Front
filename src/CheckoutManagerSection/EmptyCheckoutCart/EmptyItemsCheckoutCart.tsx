import * as React from "react";
import styles from "./EmptyItemsCheckoutCart.module.scss";

export const EmptyItemsCheckoutCart: React.FunctionComponent<{ message: string }> = props => {
    return (
        <div className={styles.container}>
            <p>{props.message}</p>
            {props.children}
        </div>
    );
}