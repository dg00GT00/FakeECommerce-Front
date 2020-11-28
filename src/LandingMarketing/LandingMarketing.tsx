import * as React from "react";
import styles from "./LandingMarketing.module.scss"

type BorderColorProps = {
    color: "primary" | "secondary"
}

export const LandingMarketing: React.FunctionComponent<BorderColorProps> = props => {
    const borderStyle = props.color === "primary" ? "border-primary" : "border-secondary";

    return (
        <div className={styles.marketing}>
            {props.children}
            <div className={styles[borderStyle]}/>
        </div>
    );
}