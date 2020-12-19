import * as React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./UserDefaultCard.module.scss";
import {ReactComponent as Logo} from "../Assets/eCommerceBaseLogo.svg";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {ComplementaryColors} from "../Utilities/Theme/CustomTheme";
import {UserAddress} from "./UserAddress/UserAddress";

const userMangerStyles = makeStyles((theme: Theme) => {
    return createStyles({
        gradient: {
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            width: "100%",
            height: "6.5px"
        },
        background: {
            backgroundColor: theme.palette.primary.main
        },
        cardContent: {
            backgroundColor: ComplementaryColors.tertiary.main,
        },
        label: {
            backgroundColor: ComplementaryColors.tertiary.main,
            padding: "0 1%"
        }
    })
});

export const UserDefaultCard: React.FunctionComponent = () => {
    const style = userMangerStyles();

    const customInputLabel = {
        InputLabelProps: {
            classes: {
                root: style.label
            }
        },
        InputProps: {
            notched: false
        }
    }

    return (
        <div className={[styles.card_page, style.background].join(" ")}>
            <Paper className={styles.card}>
                <div className={styles.card_identity}>
                    <Logo className={styles.logo}/>
                    <p className={styles.card_type}>Signup</p>
                    <div className={style.gradient}/>
                </div>
                <div className={[styles.card_content, style.cardContent].join(" ")}>
                    {/*<UserSignup {...customInputLabel}/>*/}
                    <UserAddress {...customInputLabel}/>
                    <div className={styles.action_buttons}>
                        <Button variant={"contained"}>Back</Button>
                        <Button variant={"contained"} color={"secondary"}>Go</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
