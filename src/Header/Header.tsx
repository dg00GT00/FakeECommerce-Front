import * as React from "react";
import {Logo} from "../Logo/Logo";
import styles from "./Header.module.scss"

export const Header: React.FunctionComponent = props => {
    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>Login</li>
                </ul>
            </nav>
        </div>
    )
}