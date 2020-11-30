import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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

export const BrandProductOptions: React.FunctionComponent<{ className: string }> = props => {
    const {className} = props

    const formStyles = useFormStyles();
    const [brand, setBrand] = React.useState("");
    const formRef = React.useRef<HTMLDivElement>(null)

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setBrand(event.target.value as string)
    };

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className])

    return (
        <FormControl color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
            <InputLabel htmlFor="brandIt" id={"brandIt"} classes={{formControl: formStyles.select}}>Product
                Brands</InputLabel>
            <Select
                native
                className={formStyles.select}
                value={brand}
                id={"brandIt"}
                onChange={handleChange}
                label="Product Brands"
                labelId={"brandIt"}
            >
                <option/>
                <option value={"Men Styled Clothing"}>Men Styled Clothing</option>
                <option value={"New Jewelry"}>New Jewelry</option>
                <option value={"Super Electronic"}>Super Electronic</option>
                <option value={"Women Styled Clothing"}>Women Styled Clothing</option>
                <option value={"Women Loving"}>Women Loving</option>
                <option value={"Samsung"}>Samsung</option>
            </Select>
        </FormControl>
    );
}
