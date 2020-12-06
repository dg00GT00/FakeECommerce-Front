import * as React from "react";
import styles from "./HeaderDesktop.module.scss"
import {ReactComponent as Logo} from "../../Assets/eCommerceBaseLogo.svg";

import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../Cart/CartDefault";

export const HeaderDesktop: React.FunctionComponent<HeaderProps> = props => {
    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    <li>{props.login}</li>
                    <li>{props.signup}</li>
                    <li><CartDefault className={styles.cart} color={"inherit"}/></li>
                </ul>
            </nav>
        </div>
    )
}