import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

export const UserCountry: React.FunctionComponent<UserInputTypes> = props => {
    const [country, setCountry] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <TextField color={"primary"}
                   onChange={handleChange}
                   value={country}
                   id="country"
                   label="Country"
                   variant="outlined"
                   size={"small"}
                   select={true}
                   InputLabelProps={props.InputLabelProps}
                   InputProps={props.InputProps}
                   SelectProps={{native: true}}
                   fullWidth
                   required>
            <option/>
            <option value={0}>EUA</option>
            <option value={1}>New Zealand</option>
            <option value={2}>France</option>
            <option value={3}>Brazil</option>
            <option value={4}>Canada</option>
            <option value={5}>South Africa</option>
        </TextField>
    );
}