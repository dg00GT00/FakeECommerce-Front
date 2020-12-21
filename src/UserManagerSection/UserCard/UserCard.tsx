import * as React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./UserCard.module.scss";
import {ReactComponent as Logo} from "../../Assets/eCommerceBaseLogo.svg";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";
import {Theme} from "@material-ui/core";

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

type UserCardProps = { cardType: string, formId: string};

export const UserCard: React.FunctionComponent<UserCardProps> = props => {
    const style = userMangerStyles();

    return (
        <div className={[styles.card_page, style.background].join(" ")}>
            <Paper className={styles.card}>
                <div className={styles.card_identity}>
                    <Logo className={styles.logo}/>
                    <p className={styles.card_type}>{props.cardType}</p>
                    <div className={style.gradient}/>
                </div>
                <div className={[styles.card_content, style.cardContent].join(" ")}>
                    <form id={props.formId} onSubmit={event => event.preventDefault()}>
                        {props.children}
                    </form>
                </div>
            </Paper>
        </div>
    );
}
