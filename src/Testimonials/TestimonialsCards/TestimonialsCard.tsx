import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {ComplementaryColor} from "../../Utilities/Theme/ComplementaryColors";
import styles from "./TestimonialsCard.module.scss";
import {useTheme} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        backgroundColor: ComplementaryColor.tertiary.main,
        height: "440px"
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
            <img src={props.img}
                 alt={"Beautiful woman"}
                 className={styles.avatar}
                 style={{borderColor: theme.palette.secondary.light}}/>
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
