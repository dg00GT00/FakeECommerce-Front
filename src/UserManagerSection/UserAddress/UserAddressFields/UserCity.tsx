import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useInputTextFromApi} from "../../../Utilities/CustomHooks/useInputTextFromApi";

export const UserCity: React.FunctionComponent<UserInputTypes> = props => {
    const {className, formId, formState, funcValidation, showRequiredLabel, ...inputProps} = props;

    const [city, setCity] = React.useState("");
    useInputTextFromApi("city", {formState: formState, fieldValueState: setCity});

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCity(value);
    }

    return (
        <TextField color={"primary"}
                   value={city}
                   id="city"
                   label="City"
                   variant="outlined"
                   size={"small"}
                   select={true}
                   inputProps={{value: city}}
                   className={className}
                   onChange={handleChange}
                   SelectProps={{native: true}}
                   error={formState?.city.requiredValidity}
                   onBlur={event => funcValidation ? funcValidation(event, "city") : null}
                   fullWidth
                   required
                   {...inputProps}>
            <option/>
            <option value={"A city"}>A city</option>
            <option value={"Another city"}>Another city</option>
        </TextField>
    );
}