import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserFirstName: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const ref = React.useRef<HTMLDivElement | null>(null);
    useInputTextFromApi("firstName", {ref, formState});

    return (
        <TextField color={"primary"}
                   fullWidth
                   required
                   id="firstname"
                   label="FirstName"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   ref={ref}
                   className={className}
                   FormHelperTextProps={{error: true}}
                   error={formState?.firstName.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "firstName") : null}
                   {...inputProps}/>
    );
}