import React from "react";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {SearchProducts} from "../ProductsNavigationDesktop/ProductsNavOptions/SearchProducts";
import styles from "./ProductNavigationMobile.module.scss";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fill: theme.palette.secondary.main
        }
    })
})


export const ProductNavigationMobile: React.FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const style = useStyles();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.filters_mobile}>
            <SearchProducts className={styles.product_search}/>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertRoundedIcon className={style.root}/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <ListSubheader>Filter by</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
            </Menu>
        </div>
    )
}