import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserAddressComplement: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    return (
        <TextField color={"primary"}
                   id="address-complement"
                   label="Complement"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={className}
                   fullWidth
                   error={formState?.generic.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "generic") : null}
                   helperText={formState?.generic.requiredValidity ? "* this field is required": null}
                   {...inputProps}/>
    )
}