import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ProductSortBy} from "../../../../Utilities/ProductModels/ProductFilters";
import {useHistory} from "react-router-dom";
import {ProductFilterEnum, UrlQueryFilter} from "../../../ProductRouteManager/ProductRouteManager";
import {ProductNavDesktopProps} from "../../ProductNavigationTypes";
import {parsePath} from "history";


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

export const SortProductOptions: React.FunctionComponent<ProductNavDesktopProps> = props => {
    const {className, clearFilter} = props

    const formStyles = useFormStyles();
    const {push, location: {search}} = useHistory();
    const [sortedBy, setSort] = React.useState<number | string>("");
    const [inputValue, setInputValue] = React.useState(-1);
    const formRef = React.useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSort(event.target.value as number);
        console.log(event);
        push({
            pathname: '/products',
            search: `${UrlQueryFilter.Sort}=${event.target.value as number}`,
            state: {filter: ProductFilterEnum.FilterSort}
        });
    };

    const clearInput = React.useCallback(() => {
        let callSubsequentTime = false;
        return () => {
            if (callSubsequentTime) {
                setInputValue(_ => {
                    const label = formRef.current?.querySelector("label");
                    if (label) {
                        label.setAttribute("data-shrink", "true");
                        label.classList.remove("MuiInputLabel-shrink", "MuiFormLabel-filled")
                    }
                    const legend = formRef.current?.querySelector("legend");
                    if (legend) {
                        legend.classList.remove("PrivateNotchedOutline-legendNotched-12");
                    }
                    return -1;
                });
            } else {
                callSubsequentTime = true;
            }
        }
    }, []);

    const [clearCallback] = React.useState<() => void>(() => clearInput());

    React.useEffect(() => {
        if (search.includes(UrlQueryFilter.Sort)) {
            const searchParams = parsePath(search).search;
            const queryValue = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Sort);
            setSort(_ => {
                const label = formRef.current?.querySelector("label");
                if (label) {
                    label.setAttribute("data-shrink", "true");
                    label.classList.add("MuiInputLabel-shrink", "MuiFormLabel-filled")
                }
                const legend = formRef.current?.querySelector("legend");
                if (legend) {
                    legend.classList.add("PrivateNotchedOutline-legendNotched-12");
                }
                setInputValue(parseInt(queryValue ?? "0"));
                return queryValue ?? "";
            });
        }
    }, [search])

    React.useEffect(() => {
        setSort("");
        clearCallback();
    }, [clearFilter, clearCallback]);

    React.useEffect(() => {
        formRef.current?.classList.add(className);
    }, [className])

    return (
        <FormControl size={"small"} fullWidth color={"secondary"} variant="outlined" className={formStyles.root}
                     ref={formRef}>
            <InputLabel htmlFor="sortIt" id={"sortIt"} classes={{formControl: formStyles.select}}>Sort</InputLabel>
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
