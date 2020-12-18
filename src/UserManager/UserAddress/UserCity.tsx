import * as React from "react";
import {InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const UserCity: React.FunctionComponent<{ className: string }> = props => {
    const [city, setCity] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCity(value);
    }

    return (
        <FormControl size={"small"} color={"primary"} variant="outlined" className={props.className} fullWidth>
            <InputLabel
                htmlFor="city"
                id={"city"}>City</InputLabel>
            <Select
                native
                inputProps={{required: true}}
                value={city}
                id={"city"}
                onChange={handleChange}
                label="Country"
                labelId={"city"}>
                <option/>
                <option value={0}>A city</option>
                <option value={1}>Another city</option>
            </Select>
        </FormControl>
    );
}