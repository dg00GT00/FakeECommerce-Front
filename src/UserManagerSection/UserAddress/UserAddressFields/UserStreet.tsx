import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserStreet: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;
    
    return (
        <TextField color={"primary"}
                   id="street"
                   label="Street"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   required
                   fullWidth
                   className={className}
                   FormHelperTextProps={{error: true}}
                   onBlur={event => funcValidation ? funcValidation(event, "street") : null}
                   error={formState?.street.requiredValidity}
                   {...inputProps}/>
    )
}