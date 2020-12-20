import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    FilterOptions,
    ProductFilterState,
    ProductSortBy
} from "../../../../../Utilities/ProductModels/ProductFiltersEnum";
import {ProductFilterProps} from "../../ProductFilterTypes";
import {useFilterRouteManager} from "../../../../../Utilities/CustomHooks/useFilterRouteManager";


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > .MuiOutlinedInput-root": {
                backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
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

export const SortFilterOptions: React.FunctionComponent<ProductFilterProps> = props => {
    const {className} = props

    const formStyles = useFormStyles();
    const formRef = React.useRef<HTMLDivElement>(null);
    const [sortedBy, setSort] = React.useState<number | string>("");

    const {inputValue, pushToRoute} = useFilterRouteManager(FilterOptions.Sort, ProductFilterState.FilterSort, formRef, setSort);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as number;
        pushToRoute(value);
    };

    React.useEffect(() => {
        formRef.current?.classList.add(className);
    }, [className])

    return (
        <FormControl size={"small"} fullWidth color={"secondary"} variant="outlined" className={formStyles.root}
                     ref={formRef}>
            <InputLabel
                htmlFor="sortIt"
                id={"sortIt"}
                classes={{formControl: formStyles.select}}>Sort</InputLabel>
            <Select
                native
                className={formStyles.select}
                value={sortedBy}
                id={"sortIt"}
                onChange={handleChange}
                label="Sort"
                labelId={"sortIt"}
                inputProps={{value: inputValue}}>
                <option/>
                <option value={ProductSortBy.NameAsc}>Name Alphabetically</option>
                <option value={ProductSortBy.NameDesc}>Name Reverse Alphabetically</option>
                <option value={ProductSortBy.PriceAsc}>Lower Price</option>
                <option value={ProductSortBy.PriceDesc}>Higher Price</option>
            </Select>
        </FormControl>
    );
}
