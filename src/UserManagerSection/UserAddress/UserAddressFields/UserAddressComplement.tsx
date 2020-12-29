import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserAddressComplement: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    return (
        <TextField color={"primary"}
                   fullWidth
                   required
                   id="address-complement"
                   label="Complement"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={className}
                   FormHelperTextProps={{error: true}}
                   error={formState?.complement.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "complement") : null}
                   {...inputProps}/>
    )
}