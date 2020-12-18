import * as React from "react";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const inputLabelStyle = makeStyles({
    root: {
        "&$labelFocused": {
            fontSize: "clamp(0.7rem, 4vw, 1rem)",

        },
        // "&$notchedOutline": {
        // }
    },
    outlinedInput: {
        "&$focused $notchedOutline legend": {
            maxWidth: "max-content"
        },
        "& legend": {
            fontSize: "clamp(0.7rem, 4vw, 1rem)",
            // maxWidth: "initial"
        }
    },
    notchedOutline: {},
    focused: {},
})

export const UserSignup: React.FunctionComponent<{ inputLabelStyle?: { [i: string]: string } }> = props => {
    const style = inputLabelStyle();

    return (
        <>
            <TextField color={"primary"}
                       fullWidth
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       InputLabelProps={{
                           classes: {
                               root: style.root,
                               focused: style.focused,
                           }
                       }}
                       InputProps={{
                           required: true,
                           classes: {
                               root: style.outlinedInput,
                               focused: style.focused,
                               notchedOutline: style.notchedOutline
                           }
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