import * as React from "react";
import {Logo} from "../Logo/Logo";
import styles from "./Header.module.scss"
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";

export const Header: React.FunctionComponent = props => {
    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    <li>Home</li>
                    <li>Login</li>
                    <li>Signup</li>
                    <ShoppingCartRounded className={styles.cart}/>
                </ul>
            </nav>
        </div>
    )
}