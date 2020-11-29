import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            minWidth: 120,

            "& > .MuiOutlinedInput-root": {
                backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
                // border: "thin solid #969595",
                "&:focus-within": {
                    backgroundColor: "initial",
                    // border: 0
                }
            },
            "& > fieldset": {
                border: "none",
            }
        },
        select: {
            color: theme.palette.common.white,
        }
    }),
);

export const ProductNavOptions: React.FunctionComponent = () => {
    const formStyles = useFormStyles();
    const [sortedBy, setSort] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSort(event.target.value as string)
    };

    return (
        <div>
            <FormControl color={"secondary"} variant="outlined" className={formStyles.root}>
                <InputLabel htmlFor="sort" id={"sortIt"} classes={{formControl: formStyles.select}}>Sort</InputLabel>
                <Select
                    native
                    className={formStyles.select}
                    value={sortedBy}
                    id={"sortIt"}
                    onChange={handleChange}
                    label="Sort"
                    labelId={"sortIt"}
                >
                    <option/>
                    <option value={"Alphabetically"}>Alphabetically</option>
                    <option value={"Lower Price"}>Lower Price</option>
                    <option value={"Higher Price"}>Higher Price</option>
                </Select>
            </FormControl>
        </div>
    );
}
