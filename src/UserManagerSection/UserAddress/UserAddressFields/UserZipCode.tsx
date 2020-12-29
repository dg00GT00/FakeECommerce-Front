import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserZipCode: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    return (
        <TextField color={"primary"}
                   id="zip-code"
                   label="ZipCode"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   fullWidth
                   required
                   className={className}
                   FormHelperTextProps={{error: true}}
                   error={formState?.zipcode.requiredValidity}
                   helperText={formState?.zipcode.requiredValidity ? "* this field is required" : null}
                   onBlur={event => funcValidation ? funcValidation(event, "zipcode") : null}
                   {...inputProps}/>
    );
}