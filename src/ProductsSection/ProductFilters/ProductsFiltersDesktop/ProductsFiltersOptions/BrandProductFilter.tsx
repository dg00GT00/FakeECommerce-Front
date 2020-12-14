import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ProductFilterProps} from '../../ProductFilterTypes';


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

export const BrandProductFilter: React.FunctionComponent<ProductFilterProps> = props => {
    // const {className, setClearFunction} = props
    //
    // const formStyles = useFormStyles();
    // const {push, location: {pathname, search}} = useHistory();
    // const [brand, setBrand] = React.useState<number | string>("");
    // const formRef = React.useRef<HTMLDivElement>(null)
    // const {inputValue, clearFilterFromParams} = useProductFilterRouteByQuery(UrlQueryFilter.Brand, formRef, setBrand);
    // setClearFunction({clearInputFunction: setBrand, clearFilterFromParams});
    //
    // const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    //     const queryValue = event.target.value as number;
    //     setBrand(queryValue);
    //     const fullPathName = (pathname ? pathname : "/products") + search;
    //     productRouteNavigation(UrlQueryFilter.Brand, ProductFilterEnum.FilterBrand, queryValue, push, fullPathName);
    // };
    //
    // React.useEffect(() => {
    //     formRef.current?.classList.add(className)
    // }, [className])

    return (<div/>
        // <FormControl size={"small"} color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
        //     <InputLabel htmlFor="brandIt" id={"brandIt"} classes={{formControl: formStyles.select}}>Product
        //         Brands</InputLabel>
        //     <Select
        //         native
        //         className={formStyles.select}
        //         value={brand}
        //         id={"brandIt"}
        //         onChange={handleChange}
        //         label="Product Brands"
        //         labelId={"brandIt"}
        //         inputProps={{value: inputValue}}
        //     >
        //         <option/>
        //         <option value={ProductBrands.MenStyledClothing}>Men Styled Clothing</option>
        //         <option value={ProductBrands.NewJewelry}>New Jewelry</option>
        //         <option value={ProductBrands.SuperElectronic}>Super Electronic</option>
        //         <option value={ProductBrands.WomenStyledClothing}>Women Styled Clothing</option>
        //         <option value={ProductBrands.WomenLoving}>Women Loving</option>
        //         <option value={ProductBrands.Samsung}>Samsung</option>
        //     </Select>
        // </FormControl>
    );
}
