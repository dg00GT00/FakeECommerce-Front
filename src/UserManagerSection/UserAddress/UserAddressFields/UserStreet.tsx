import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserStreet: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const ref = React.useRef<HTMLDivElement | null>(null);
    useInputTextFromApi("street", {ref, formState});

    return (
        <TextField color={"primary"}
                   ref={ref}
                   id="street"
                   label="Street"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   required
                   fullWidth
                   className={className}
                   onBlur={event => funcValidation ? funcValidation(event, "street") : null}
                   error={formState?.street.requiredValidity}
                   {...inputProps}/>
    )
}