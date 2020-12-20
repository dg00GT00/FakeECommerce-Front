import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {NavLink} from "react-router-dom";
import styles from "./UserLogin.module.scss";


export const UserLogin: React.FunctionComponent<UserInputTypes> = props => {
    return (
        <>
            <TextField color={"primary"}
                       fullWidth
                       id="username"
                       label="Username"
                       type="email"
                       variant="outlined"
                       size={"small"}
                       {...props}
            />
            <TextField color={"primary"}
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       {...props}
            />
            <NavLink to={"/user/signup"} className={styles.forgot_password}>Forgot your password?</NavLink>
        </>
    )
}