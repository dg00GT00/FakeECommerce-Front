import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserAddressComplement: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const ref = React.useRef<HTMLDivElement | null>(null);
    useInputTextFromApi("complement", {ref, formState});

    return (
        <TextField color={"primary"}
                   fullWidth
                   ref={ref}
                   id="complement"
                   label="Address Complement"
                   type="text"
                   variant="outlined"
                   size={"small"}
                   className={className}
                   {...inputProps}/>
    )
}