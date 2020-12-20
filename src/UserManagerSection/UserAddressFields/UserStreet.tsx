import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

export const UserStreet: React.FunctionComponent<UserInputTypes & {className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="street"
                   label="Street"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   fullWidth
                   required
                   {...props}/>
    )
}