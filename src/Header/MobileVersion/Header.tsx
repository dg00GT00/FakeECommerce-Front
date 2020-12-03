import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ReactComponent as Logo} from "../../Assets/eCommerceFooter.svg";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ShoppingCartRounded from "@material-ui/icons/ShoppingCartRounded";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from "./Header.module.scss";
import {Fade, Menu, MenuItem} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fill: theme.palette.secondary.dark,
        },
    }),
);

type HeaderProps = {
    logo: JSX.Element,
}

export const Header: React.FunctionComponent = () => {
    const style = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | SVGElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<SVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <Logo className={styles.logo}/>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem>Login</MenuItem>
                    <MenuItem>Signup</MenuItem>
                </Menu>
                <div className={styles.menu_actions}>
                    <ShoppingCartRounded className={styles.cart}/>
                    <AccountBoxRoundedIcon className={styles.account} onClick={handleProfileMenuOpen}/>
                </div>
            </Toolbar>
        </AppBar>
    );
}
