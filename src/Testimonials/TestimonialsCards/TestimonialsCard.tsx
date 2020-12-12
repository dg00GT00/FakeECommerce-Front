import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import styles from "./TestimonialsCard.module.scss";
import {useTheme} from "@material-ui/core";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";


const useStyles = makeStyles({
    root: {
        backgroundColor: ComplementaryColors.tertiary.main,
    }
})

type TestimonialsCardProps = {
    img: string,
    name: string
}

export const TestimonialsCard: React.FunctionComponent<TestimonialsCardProps> = props => {
    const style = useStyles();
    const theme = useTheme();

    return (
        <div className={styles.card_container}>
            <div className={styles.avatar_container}>
                <img src={props.img}
                      alt={"Beautiful woman"}
                      className={styles.avatar}
                      style={{borderColor: theme.palette.secondary.light}}/>
            </div>
            <Paper className={[style.root, styles.card_content].join(" ")} elevation={3}>
                <p>
                    {props.children}
                </p>
                <div className={styles.divider}/>
                <p className={styles.name}>{props.name}</p>
            </Paper>
        </div>
    )
}
