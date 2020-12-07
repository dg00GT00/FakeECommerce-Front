import * as React from "react";
import {CartContext} from "./CartContext";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import {ComplementaryColors} from "../Utilities/Theme/CustomTheme";

const cartStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.secondary.main,
            "& .MuiBadge-badge": {
                backgroundColor: ComplementaryColors.contrast
            }
        }
    })
})

export const FloatingCard: React.FunctionComponent<{style: {[i: string]: string | number}}> = props => {
    const cartContext = React.useContext(CartContext);
    const style = cartStyle();

    return (
        <IconButton className={style.root} aria-label={"shopping cart"} color={"primary"} style={props.style}>
            <Badge badgeContent={cartContext.amount}>
                <ShoppingCartRounded/>
            </Badge>
        </IconButton>
    )
}