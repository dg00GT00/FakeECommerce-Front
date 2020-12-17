import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {FilterOptions, ProductFilterState, ProductTypes} from '../../../../Utilities/ProductModels/ProductFiltersEnum';
import {ProductFilterProps} from "../../ProductFilterTypes";
import {useFilterRouteManager} from "../../../../Utilities/CustomHooks/useFilterRouteManager";


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


export const TypeFilterOptions: React.FunctionComponent<ProductFilterProps> = props => {
    const {className} = props;
    const formStyles = useFormStyles();
    const formRef = React.useRef<HTMLDivElement>(null)
    const [type, setType] = React.useState<number | string>("");

    const {inputValue, pushToRoute} = useFilterRouteManager(FilterOptions.Type, ProductFilterState.FilterType, formRef, setType);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const queryValue = event.target.value as number;
        pushToRoute(queryValue);
    };

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className]);

    return (
        <FormControl size={"small"} color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
            <InputLabel
                htmlFor="typeIt"
                id={"typeIt"}
                classes={{formControl: formStyles.select}}>Product Type</InputLabel>
            <Select
                native
                className={formStyles.select}
                value={type}
                id={"typeIt"}
                onChange={handleChange}
                label="Product Type"
                labelId={"typeIt"}
                inputProps={{value: inputValue}}>
                <option/>
                <option value={ProductTypes.MenClothing}>Men Clothing</option>
                <option value={ProductTypes.Jewelry}>Jewelry</option>
                <option value={ProductTypes.Electronics}>Electronics</option>
                <option value={ProductTypes.WomenClothing}>Women Clothing</option>
            </Select>
        </FormControl>
    );
}
