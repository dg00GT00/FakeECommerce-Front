import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

export const UserZipCode: React.FunctionComponent<UserInputTypes & {className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="zip-code"
                   label="ZipCode"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   fullWidth
                   required
                   {...props}/>
    );
}