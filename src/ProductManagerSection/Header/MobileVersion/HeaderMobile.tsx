import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from "./HeaderMobile.module.scss";
import {ReactComponent as Logo} from "../../../Assets/eCommerceFooter.svg";

import {Fade, Menu, MenuItem} from "@material-ui/core";
import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../Cart/CartDefault";
import {NavLink} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fill: theme.palette.secondary.dark,
        },
    }),
);

export const HeaderMobile: React.FunctionComponent<HeaderProps> = props => {
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
                    TransitionComponent={Fade}>
                    <MenuItem>
                        <NavLink to={props.loginPath}
                                 style={{textDecoration: "none", color: "currentColor"}}>Login
                        </NavLink></MenuItem>
                    <MenuItem>
                        <NavLink to={props.signupPath}
                                 style={{textDecoration: "none", color: "currentColor"}}>Signup
                        </NavLink></MenuItem>
                </Menu>
                <div className={styles.menu_actions}>
                    <CartDefault classNameButton={""} colorButton={"inherit"}/>
                    <AccountBoxRoundedIcon className={""} onClick={handleProfileMenuOpen}/>
                </div>
            </Toolbar>
        </AppBar>
    );
}
