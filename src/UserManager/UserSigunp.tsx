import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../Utilities/ProductModels/UserInputTypes";

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {
    const {InputLabelProps, InputProps} = props;

    return (
        <>
            <TextField color={"primary"}
                       fullWidth
                       required
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       InputProps={InputProps}
                       InputLabelProps={InputLabelProps}
            />
            <TextField color={"primary"}
                       required
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       InputProps={InputProps}
                       InputLabelProps={InputLabelProps}
                       fullWidth/>
            <TextField color={"primary"}
                       id="repeat-password"
                       label="Repeat Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       InputProps={InputProps}
                       InputLabelProps={InputLabelProps}
                       required/>
        </>
    );
}