import * as React from "react";
import styles from "./HeaderDesktop.module.scss"
import {ReactComponent as Logo} from "../../../Assets/eCommerceBaseLogo.svg";
import {HeaderProps} from "../HeaderProps";
import {CartDefault} from "../../../ProductManagerSection/Cart/CartDefault";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../../Utilities/Context/AuthContext";
import {Fade, Menu, MenuItem, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {UserAccountIcon} from "../UserAccountIcon";

const logoutStyle = makeStyles({
    root: {
        fontFamily: "Nunito, sans-serif",
        textTransform: "capitalize"
    }
})

export const HeaderDesktop: React.FunctionComponent<HeaderProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const {jwtManager, JWT_SESSION_KEY} = React.useContext(AuthContext);
    const {push} = useHistory();
    const style = logoutStyle();

    const logout: React.MouseEventHandler = event => {
        jwtManager.deleteJwt();
        handleMenuClose();
        sessionStorage.removeItem(JWT_SESSION_KEY);
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
                <MenuItem className={style.root} onClick={_ => push("/user/address/update")}>Update Address</MenuItem>
            </Menu>
            <Tooltip title={jwtManager.getDisplayNameFromJwt() ?? {}} className={styles.user_account} placement={"top"}>
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
                    {jwtManager.jwt ? accountButton :
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
