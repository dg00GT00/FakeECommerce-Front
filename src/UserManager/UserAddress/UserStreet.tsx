import * as React from "react";
import {TextField} from "@material-ui/core";

export const UserStreet: React.FunctionComponent<{className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="street"
                   label="Street"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={props.className}
                   fullWidth
                   InputProps={{
                       required: true,
                   }}/>
    )
}