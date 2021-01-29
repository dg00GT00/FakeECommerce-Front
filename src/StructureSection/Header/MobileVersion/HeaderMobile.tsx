import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from "./HeaderMobile.module.scss";
import {ReactComponent as Logo} from "../../../Assets/eCommerceFooter.svg";

import {Fade, Menu, MenuItem} from "@material-ui/core";
import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../../ProductManagerSection/Cart/CartDefault";
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../../Utilities/Context/AuthContext";
import IconButton from "@material-ui/core/IconButton";
import {UserAccountIcon} from "../UserAccountIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fill: theme.palette.secondary.dark,
        },
    }),
);

export const HeaderMobile: React.FunctionComponent<HeaderProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const {jwt, userLogout} = React.useContext(AuthContext);
    const style = useStyles();

    const handleProfileMenuOpen: React.MouseEventHandler = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout: React.MouseEventHandler = event => {
        userLogout();
        handleMenuClose();
    }

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
                    {jwt ?
                        <MenuItem className={style.root} onClick={logout}>Logout</MenuItem> :
                        <>
                            <MenuItem>
                                <NavLink to={props.loginPath}
                                         style={{textDecoration: "none", color: "currentColor"}}>
                                    Login
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to={props.signupPath}
                                         style={{textDecoration: "none", color: "currentColor"}}>
                                    Signup
                                </NavLink>
                            </MenuItem>
                        </>
                    }
                </Menu>
                <div className={styles.menu_actions}>
                    <CartDefault classNameButton={""} colorButton={"inherit"}/>
                    {
                        jwt ?
                            <IconButton onClick={handleProfileMenuOpen}>
                                <UserAccountIcon fill={"white"}/>
                            </IconButton> :
                            <AccountBoxRoundedIcon className={""} onClick={handleProfileMenuOpen}/>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
}
