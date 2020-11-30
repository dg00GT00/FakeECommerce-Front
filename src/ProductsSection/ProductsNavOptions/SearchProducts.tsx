import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            minWidth: 120,
            fontFamily: "inherit",
            "& .MuiInputBase-root": {
                color: theme.palette.common.white,
            },
            "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
                "&:focus-within": {
                    backgroundColor: "initial",
                }
            },
            "& .MuiInputLabel-root": {
                color: theme.palette.common.white
            },
            "& .Mui-focused": {
                color: theme.palette.secondary.main
            }
        },
    }),
);

export const SearchProducts: React.FunctionComponent = () => {
    const formStyles = useFormStyles();

    return (
        <TextField color={"secondary"} id="search-products" label="Search" type="search" variant="outlined"
                   className={formStyles.root}/>
    )
}
