import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

export const UserAddressComplement: React.FunctionComponent<UserInputTypes & {className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="address-complement"
                   label="Complement"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={props.className}
                   InputProps={props.InputProps}
                   InputLabelProps={props.InputLabelProps}
                   fullWidth
                   />
    )
}