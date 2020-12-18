import * as React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./UserSignup.module.scss";
import {ReactComponent as Logo} from "../Assets/eCommerceBaseLogo.svg";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {TextField, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {ComplementaryColors} from "../Utilities/Theme/CustomTheme";

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
        }
    })
})

export const UserSignup: React.FunctionComponent = () => {
    const style = userMangerStyles();

    return (
        <div className={[styles.card_page, style.background].join(" ")}>
            <Paper className={styles.card}>
                <div className={styles.card_identity}>
                    <Logo className={styles.logo}/>
                    <p className={styles.card_type}>Signup</p>
                    <div className={style.gradient}/>
                </div>
                <div className={[styles.card_content, style.cardContent].join(" ")}>
                    <TextField color={"primary"}
                               id="username"
                               label="Username"
                               type="text"
                               variant="outlined"
                               size={"small"}
                               fullWidth
                               InputProps={{
                                   required: true
                               }}/>
                    <TextField color={"primary"}
                               id="password"
                               label="Password"
                               type="password"
                               variant="outlined"
                               size={"small"}
                               fullWidth
                               InputProps={{
                                   required: true
                               }}/>
                    <TextField color={"primary"}
                               id="repeat-password"
                               label="Repeat Password"
                               type="password"
                               variant="outlined"
                               size={"small"}
                               fullWidth
                               InputProps={{
                                   required: true
                               }}/>
                    <div className={styles.action_buttons}>
                        <Button variant={"contained"}>Back</Button>
                        <Button variant={"contained"} color={"secondary"}>Go</Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
