import * as React from "react";
import {TextField} from "@material-ui/core";

export const UserSignup = () => {
    return (
        <>
            <TextField color={"primary"}
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       InputProps={{
                           required: true
                       }}/>
            <TextField color={"primary"}
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       InputProps={{
                           required: true
                       }}/>
            <TextField color={"primary"}
                       id="repeat-password"
                       label="Repeat Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       InputProps={{
                           required: true,
                       }}/>
        </>
    );
}