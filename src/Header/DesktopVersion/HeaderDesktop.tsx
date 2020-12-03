import * as React from "react";
import styles from "./HeaderDesktop.module.scss"
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import {ReactComponent as Logo} from "../../Assets/eCommerceBaseLogo.svg";

import {HeaderProps} from "../HeaderProps";

export const HeaderDesktop: React.FunctionComponent<HeaderProps> = props => {
    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    <li>{props.login}</li>
                    <li>{props.signup}</li>
                    <ShoppingCartRounded className={styles.cart}/>
                </ul>
            </nav>
        </div>
    )
}