import * as React from "react";
import styles from "./HeaderDesktop.module.scss"
import {ReactComponent as Logo} from "../../../Assets/eCommerceBaseLogo.svg";
import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../../ProductManagerSection/Cart/CartDefault";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../Utilities/Context/AuthContext";
import {Fade, Menu, MenuItem, SvgIcon, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";

const logoutStyle = makeStyles({
    root: {
            fontFamily: "Nunito, sans-serif",
            textTransform: "capitalize"
    }
})

const UserAccountIcon: React.FunctionComponent = () => {
    return (
        <SvgIcon>
            <path fill="black"
                  d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"/>
        </SvgIcon>
    );
}

export const HeaderDesktop: React.FunctionComponent<HeaderProps> = props => {
    const {getJwt, user} = React.useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const style = logoutStyle();

    const logout: React.MouseEventHandler = event => {
        user.deleteJwt();
        handleMenuClose();
    }

    const handleProfileMenuOpen: React.MouseEventHandler = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const accountButton = (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: -70,
                    horizontal: "center",
                }}>
                <MenuItem className={style.root} onClick={logout}>Logout</MenuItem>
            </Menu>
            <Tooltip title={user.getDisplayNameFromJwt() ?? {}} className={styles.user_account} placement={"top"}>
                <IconButton onClick={handleProfileMenuOpen}>
                    <UserAccountIcon/>
                </IconButton>
            </Tooltip>
        </>
    );

    return (
        <div className={styles.header}>
            <Logo/>
            <nav className={styles.nav}>
                <ul>
                    {getJwt() ? accountButton :
                        <>
                            <NavLink to={props.loginPath}>Login</NavLink>
                            <NavLink to={props.signupPath}>Signup</NavLink>
                        </>
                    }
                    <li><CartDefault classNameButton={styles.cart} colorButton={"inherit"}/></li>
                </ul>
            </nav>
        </div>
    )
}
