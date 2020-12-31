import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";


export const UserState: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;
    const [state, setState] = React.useState("");

    useInputTextFromApi("state", {formState: formState, fieldValueState: setState});

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setState(value);
    }

    return (
        <TextField color={"primary"}
                   {...inputProps}
                   onChange={handleChange}
                   inputProps={{value: state}}
                   value={state}
                   id="state"
                   label="State"
                   variant="outlined"
                   size={"small"}
                   select={true}
                   required
                   fullWidth
                   onBlur={event => props.funcValidation ? props.funcValidation(event, "state") : null}
                   error={props.formState?.state.requiredValidity}
                   FormHelperTextProps={{error: true}}
                   SelectProps={{native: true}}>
            <option/>
            <option value={"A state"}>A state</option>
            <option value={"Another state"}>Another state</option>
        </TextField>
    );
}