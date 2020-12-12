import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductBrands} from "../../../../Utilities/ProductModels/ProductFilters";
import {ProductFilterEnum, UrlQueryFilter} from "../../../ProductRouteManager/ProductRouteManager";
import {useHistory} from "react-router-dom";


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

export const BrandProductOptions: React.FunctionComponent<{ className: string }> = props => {
    const {className} = props

    const formStyles = useFormStyles();
    const history = useHistory();
    const [brand, setBrand] = React.useState<number | undefined>(0);
    const formRef = React.useRef<HTMLDivElement>(null)

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setBrand(event.target.value as number);
        history.push({
            pathname: '/products',
            search: `${UrlQueryFilter.Brand}=${event.target.value as number}`,
            state: {filter: ProductFilterEnum.FilterBrand}
        });
    };

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
