import * as React from "react";
import {TextField} from "@material-ui/core";

export const UserZipCode: React.FunctionComponent<{className: string}> = props => {
    return (
        <TextField color={"primary"}
                   id="zip-code"
                   label="ZipCode"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   fullWidth
                   className={props.className}
                   InputProps={{
                       required: true,
                   }}/>
    );
}