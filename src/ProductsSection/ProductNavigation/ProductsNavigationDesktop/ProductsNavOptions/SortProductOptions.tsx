import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductSortBy} from "../../../../Utilities/ProductModels/ProductFilters";


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

export const SortProductOptions: React.FunctionComponent<{ className: string }> = props => {
    const {className} = props

    const formStyles = useFormStyles();
    const [sortedBy, setSort] = React.useState<number | undefined>(undefined);
    const formRef = React.useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSort(event.target.value as number);
    };

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className])

    return (
        <FormControl size={"small"} fullWidth color={"secondary"} variant="outlined" className={formStyles.root} ref={formRef}>
            <InputLabel htmlFor="sortIt" id={"sortIt"} classes={{formControl: formStyles.select}}>Sort</InputLabel>
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
                <option value={ProductSortBy.NameAsc}>Product Name Alphabetically</option>
                <option value={ProductSortBy.NameDesc}>Product Name Alphabetically Reverse</option>
                <option value={ProductSortBy.PriceDesc}>Lower Price</option>
                <option value={ProductSortBy.PriceAsc}>Higher Price</option>
            </Select>
        </FormControl>
    );
}
