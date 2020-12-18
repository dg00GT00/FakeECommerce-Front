import * as React from "react";
import {InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";


export const UserState: React.FunctionComponent = () => {
    const [state, setState] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setState(value);
    }

    return (
        <FormControl size={"small"} color={"primary"} variant="outlined">
            <InputLabel
                htmlFor="state"
                id={"state"}>State</InputLabel>
            <Select
                native
                inputProps={{required: true}}
                value={state}
                id={"state"}
                onChange={handleChange}
                label="State"
                labelId={"state"}>
                <option/>
                <option value={0}>A state</option>
                <option value={1}>Another state</option>
            </Select>
        </FormControl>
    )
}