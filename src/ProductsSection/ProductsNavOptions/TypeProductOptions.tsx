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
                backgroundColor: "#808488", // Change this value if the secondary theme color also change
                "&:focus-within": {
                    backgroundColor: "initial",
                }
            },
            "& > fieldset": {
                border: "none",
            }
        },
        select: {
            color: theme.palette.common.white,
            fontFamily: "inherit",
            "&:not([multiple]) option": {
                backgroundColor: theme.palette.primary.light,
                color: "white",
            },
        }
    }),
);

export const TypeProductOptions: React.FunctionComponent = () => {
    const formStyles = useFormStyles();
    const [type, setType] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setType(event.target.value as string)
    };

    return (
        <FormControl color={"secondary"} variant="outlined" className={formStyles.root}>
            <InputLabel htmlFor="typeIt" id={"typeIt"} classes={{formControl: formStyles.select}}>Product
                Type</InputLabel>
            <Select
                native
                className={formStyles.select}
                value={type}
                id={"typeIt"}
                onChange={handleChange}
                label="Product Type"
                labelId={"typeIt"}
            >
                <option/>
                <option value={"Men Clothing"}>Men Clothing</option>
                <option value={"Jewelry"}>Jewelry</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"Women Clothing"}>Women Clothing</option>
            </Select>
        </FormControl>
    );
}
