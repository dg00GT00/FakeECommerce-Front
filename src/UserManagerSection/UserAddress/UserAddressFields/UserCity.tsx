import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";

export const UserCity: React.FunctionComponent<UserInputTypes> = props => {
    const [city, setCity] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCity(value);
    }

    return (
        <TextField color={"primary"}
                   value={city}
                   onChange={handleChange}
                   id="city"
                   label="City"
                   variant="outlined"
                   size={"small"}
                   className={props.className}
                   select={true}
                   InputLabelProps={props.InputLabelProps}
                   InputProps={props.InputProps}
                   SelectProps={{native: true}}
                   error={props.formState?.city.requiredValidity}
                   onBlur={event => props.funcValidation ? props.funcValidation(event, "city") : null}
                   fullWidth
                   required>
            <option/>
            <option value={"A city"}>A city</option>
            <option value={"Another city"}>Another city</option>
        </TextField>
    );
}