import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserZipCode: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;
    const ref = React.useRef<HTMLDivElement | null>(null);
    useInputTextFromApi("zipcode", {ref, formState});

    return (
        <TextField color={"primary"}
                   ref={ref}
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
                   onBlur={event => funcValidation ? funcValidation(event, "zipcode") : null}
                   {...inputProps}/>
    );
}