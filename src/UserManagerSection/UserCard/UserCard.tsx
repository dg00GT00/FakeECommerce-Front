import * as React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./UserCard.module.scss";
import {ReactComponent as Logo} from "../../Assets/eCommerceBaseLogo.svg";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";
import {useHistory} from "react-router-dom";

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
    })
});

export const UserCard: React.FunctionComponent<{ cardType: string, showRequiredLabel?: boolean }> = ({
                                                                                                         showRequiredLabel = true,
                                                                                                         ...props
                                                                                                     }) => {
    const style = userMangerStyles();
    const {goBack} = useHistory();

    return (
        <div className={[styles.card_page, style.background].join(" ")}>
            <Paper className={styles.card}>
                <div className={styles.card_identity}>
                    <Logo className={styles.logo}/>
                    <p className={styles.card_type}>{props.cardType}</p>
                    <div className={style.gradient}/>
                </div>
                <div className={[styles.card_content, style.cardContent].join(" ")}>
                    {props.children}
                    {showRequiredLabel ? <p>* fields required</p> : null}
                    <div className={styles.action_buttons}>
                        <Button variant={"contained"} onClick={_ => goBack()}>Back</Button>
                        <Button variant={"contained"} color={"secondary"}>Go</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
