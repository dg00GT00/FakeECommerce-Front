import * as React from "react";
import {useTheme} from "@material-ui/core";
import styles from "./Footer.module.scss";
import {ReactComponent as FooterLogo} from "../Assets/eCommerceFooter.svg";
import {ReactComponent as GithubIcon} from "../Assets/githubIcon.svg";
import fakeCreditCard from "../Assets/fakeCreditCardModified.webp";


export const Footer: React.FunctionComponent = () => {
    const theme = useTheme();

    return (
        <footer className={styles.footer} style={{backgroundColor: theme.palette.primary.main}}>
            <div className={styles.container}>
                <div className={styles.footer_logo}>
                    <FooterLogo/>
                </div>
                <div className={styles.merchandise}>
                    <div className={styles.follow_us}>
                        <p>Follow us on</p>
                        <div className={styles.divider}/>
                        <a href="https://github.com/dg00GT00" target={"_blank"} rel={"noopener noreferrer"}>
                            <GithubIcon/>
                        </a>
                    </div>
                    <div className={styles.payment}>
                        <p>Secure payment with</p>
                        <div className={styles.divider}/>
                        <img src={fakeCreditCard} alt="An infinity limit credit card"/>
                    </div>
                </div>
            </div>
            <p style={{backgroundColor: theme.palette.primary.dark}}>done truly by <address
                style={{color: theme.palette.secondary.main}}>Gledson Duarte da Silva</address>
            </p>
        </footer>
    )
}