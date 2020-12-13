import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductBrands} from "../../../../Utilities/ProductModels/ProductFilters";
import {ProductFilterEnum, UrlQueryFilter} from "../../../../Utilities/Routes/ProductRouteManager/ProductRouteManager";
import {useHistory} from "react-router-dom";
import {ProductNavDesktopProps} from "../../ProductFiltersTypes";
import {useFilterByQueryParams} from "../../../../Utilities/CustomHooks/useFilterByQueryParams";
import {productRouteNavigation} from "../../../../Utilities/Routes/ProductRouteManager/ProductRouteNavigation";


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
            },
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

export const BrandProductFilter: React.FunctionComponent<ProductNavDesktopProps> = props => {
    const {className, clearFilter} = props

    const formStyles = useFormStyles();
    const {push} = useHistory();
    const [brand, setBrand] = React.useState<number | string>("");
    const formRef = React.useRef<HTMLDivElement>(null)
    const {inputValue, clearFilterFromParams} = useFilterByQueryParams(UrlQueryFilter.Brand, formRef, setBrand);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const queryValue = event.target.value as number;
        setBrand(queryValue);
        productRouteNavigation(UrlQueryFilter.Brand, ProductFilterEnum.FilterBrand, queryValue, push);
    };

    React.useEffect(() => {
        setBrand("");
        clearFilterFromParams();
    }, [clearFilter, clearFilterFromParams]);

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className])

    return (
        <FormControl size={"small"} color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
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
                inputProps={{value: inputValue}}
            >
                <option/>
                <option value={ProductBrands.MenStyledClothing}>Men Styled Clothing</option>
                <option value={ProductBrands.NewJewelry}>New Jewelry</option>
                <option value={ProductBrands.SuperElectronic}>Super Electronic</option>
                <option value={ProductBrands.WomenStyledClothing}>Women Styled Clothing</option>
                <option value={ProductBrands.WomenLoving}>Women Loving</option>
                <option value={ProductBrands.Samsung}>Samsung</option>
            </Select>
        </FormControl>
    );
}
