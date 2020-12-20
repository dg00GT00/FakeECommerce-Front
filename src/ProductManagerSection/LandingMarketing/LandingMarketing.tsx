import * as React from "react";
import styles from "./LandingMarketing.module.scss"
import {Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type BorderColorProps = {
    color: "primary" | "secondary"
}

const useStyles = makeStyles<Theme, { color: string }>({
    root: props => ({
        borderBottom: `5px solid ${props.color}`,
    })
})

const newProps: { color: string } = {color: ""}

export const LandingMarketing: React.FunctionComponent<BorderColorProps> = props => {
    const classes = useTheme();
    const {primary, secondary} = classes.palette

    if (props.color === "primary") {
        newProps.color = primary.main
    }
    if (props.color === "secondary") {
        newProps.color = secondary.main
    }
    const style = useStyles(newProps);

    return (
        <div className={styles.marketing}>
            <h1>
                {props.children}
            </h1>
            <div className={[style.root, styles.divider].join(" ")}/>
        </div>
    );
}