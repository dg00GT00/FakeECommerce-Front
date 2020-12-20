import * as React from "react";
import styles from "./HeaderDesktop.module.scss"
import {ReactComponent as Logo} from "../../../Assets/eCommerceBaseLogo.svg";

import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../Cart/CartDefault";
import {NavLink} from "react-router-dom";

export const HeaderDesktop: React.FunctionComponent<HeaderProps> = props => {
    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    <NavLink to={props.loginPath}>Login</NavLink>
                    <NavLink to={props.signupPath}>Signup</NavLink>
                    <li><CartDefault classNameButton={styles.cart} colorButton={"inherit"}/></li>
                </ul>
            </nav>
        </div>
    )
}