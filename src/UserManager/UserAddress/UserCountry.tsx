import * as React from "react";
import {InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const UserCountry: React.FunctionComponent = () => {
    const [country, setCountry] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <FormControl size={"small"} color={"primary"} variant="outlined">
            <InputLabel
                htmlFor="country"
                id={"country"}>Country</InputLabel>
            <Select
                native
                inputProps={{required: true}}
                value={country}
                id={"country"}
                onChange={handleChange}
                label="Country"
                labelId={"country"}>
                <option/>
                <option value={0}>EUA</option>
                <option value={1}>New Zealand</option>
                <option value={2}>France</option>
                <option value={3}>Brazil</option>
                <option value={4}>Canada</option>
                <option value={5}>South Africa</option>
            </Select>
        </FormControl>
    );
}