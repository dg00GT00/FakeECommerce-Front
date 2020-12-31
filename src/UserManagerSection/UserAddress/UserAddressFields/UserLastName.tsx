import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserLastName: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const ref = React.useRef<HTMLDivElement | null>(null);
    useInputTextFromApi("lastName", {ref, formState});

    return (
        <TextField color={"primary"}
                   ref={ref}
                   fullWidth
                   required
                   id="lastname"
                   label="LastName"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={className}
                   FormHelperTextProps={{error: true}}
                   error={formState?.lastName.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "lastName") : null}
                   {...inputProps}/>
    )
}