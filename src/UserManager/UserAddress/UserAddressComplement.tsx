import * as React from "react";
import {TextField} from "@material-ui/core";

export const UserAddressComplement: React.FunctionComponent<{className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="address-complement"
                   label="Complement"
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