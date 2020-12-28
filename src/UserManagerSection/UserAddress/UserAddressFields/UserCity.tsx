import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../../Utilities/ProductModels/UserInputTypes";
import {useUserAccountFormValidation} from "../../../Utilities/CustomHooks/formValidation/useUserAccountFormValidation";

export const UserCity: React.FunctionComponent<UserInputTypes & { className: string }> = props => {
    const [city, setCity] = React.useState("");
    const {validationFunctions, validationState} = useUserAccountFormValidation();

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
                   fullWidth
                   required>
            <option/>
            <option value={0}>A city</option>
            <option value={1}>Another city</option>
        </TextField>
    );
}