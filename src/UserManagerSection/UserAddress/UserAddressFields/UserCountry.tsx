import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserCountry: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const [country, setCountry] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <TextField color={"primary"}
                   {...inputProps}
                   fullWidth
                   required
                   onChange={handleChange}
                   value={country}
                   id="country"
                   label="Country"
                   variant="outlined"
                   size={"small"}
                   select={true}
                   SelectProps={{native: true}}
                   FormHelperTextProps={{error: true}}
                   error={formState?.country.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "country") : null}>
            <option/>
            <option value={"EUA"}>EUA</option>
            <option value={"New Zealand"}>New Zealand</option>
            <option value={"France"}>France</option>
            <option value={"Brazil"}>Brazil</option>
            <option value={"Canada"}>Canada</option>
            <option value={"South Africa"}>South Africa</option>
        </TextField>
    );
}