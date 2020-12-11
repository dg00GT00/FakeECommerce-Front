import React, {useRef} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductTypes} from '../../../../Utilities/ProductModels/ProductFilters';
import {MenuItem} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import {ProductFilterEnum} from "../../../ProductRouteManager/ProductRouteManager";


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
            "&:not([multiple]) MenuItem": {
                backgroundColor: theme.palette.primary.light,
                color: "white",
            },
        }
    }),
);

export const TypeProductOptions: React.FunctionComponent<{ className: string }> = props => {
    const {className} = props;

    const formStyles = useFormStyles();
    const formRef = useRef<HTMLDivElement>(null)
    const [type, setType] = React.useState<number | string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setType(event.target.value as number);
    };

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className])

    return (
        <FormControl size={"small"} color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
            <InputLabel htmlFor="typeIt" id={"typeIt"} classes={{formControl: formStyles.select}}>Product
                Type</InputLabel>
            <Select
                className={formStyles.select}
                value={type}
                id={"typeIt"}
                onChange={handleChange}
                label="Product Type"
                labelId={"typeIt"}
            >
                <MenuItem/>
                <MenuItem value={ProductTypes.MenClothing}>
                    <NavLink to={{
                        pathname: '/products',
                        search: `type=${type}`,
                        state: {filter: ProductFilterEnum.FilterType}
                    }}>Men Clothing</NavLink>
                </MenuItem>
                <MenuItem value={ProductTypes.Jewelry}>
                    <NavLink to={{
                        pathname: '/products',
                        search: `type=${type}`,
                        state: {filter: ProductFilterEnum.FilterType}
                    }}>Jewelry</NavLink></MenuItem>
                <MenuItem value={ProductTypes.Electronics}>
                    <NavLink to={{
                        pathname: '/products',
                        search: `type=${type}`,
                        state: {filter: ProductFilterEnum.FilterType}
                    }}>Electronics</NavLink></MenuItem>
                <MenuItem value={ProductTypes.WomenClothing}>
                    <NavLink to={{
                        pathname: '/products',
                        search: `type=${type}`,
                        state: {filter: ProductFilterEnum.FilterType}
                    }}>Women Clothing</NavLink></MenuItem>
            </Select>
        </FormControl>
    );
}
