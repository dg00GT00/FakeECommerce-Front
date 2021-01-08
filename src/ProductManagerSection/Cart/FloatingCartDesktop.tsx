import * as React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";
import {CartDefault} from "./CartDefault";

const cartStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.secondary.main,
            "& .MuiBadge-badge": {
                backgroundColor: ComplementaryColors.contrast
            },
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark
            }
        }
    })
});

export const FloatingCartDesktop: React.FunctionComponent<{ style: { [i: string]: string | number } }> = props => {
    const style = cartStyle();

    return <CartDefault
        classNameButton={style.root}
        style={props.style}
        colorButton={"primary"}
        hideWhenZero/>
}