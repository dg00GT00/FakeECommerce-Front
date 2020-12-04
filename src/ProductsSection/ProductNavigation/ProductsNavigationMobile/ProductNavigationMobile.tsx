import React from "react";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import styles from "./ProductNavigationMobile.module.scss";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {InputBase, Paper, useTheme} from "@material-ui/core";

const seeMoreStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fill: theme.palette.secondary.main
        }
    })
})

const searchBarStyle = makeStyles({
    root: {
        backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
    }
})

export const ProductNavigationMobile: React.FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const moreStyle = seeMoreStyle();
    const searchStyle = searchBarStyle();
    const theme = useTheme();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.mobile_filters_container} style={{backgroundColor: theme.palette.primary.main}}>
            <div className={styles.mobile_filters}>
                <Paper className={[styles.product_search, searchStyle.root].join(" ")}>
                    <IconButton aria-label={"search"}>
                        <SearchRoundedIcon className={styles.search_icon}/>
                    </IconButton>
                    <InputBase placeholder={"Search"} fullWidth className={styles.input_search_bar}/>
                </Paper>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertRoundedIcon className={moreStyle.root}/>
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
        </div>
    )
}