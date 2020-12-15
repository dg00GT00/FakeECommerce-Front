import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ProductFilterProps} from '../../ProductFilterTypes';
import {TextField} from "@material-ui/core";
import {useFilterRouteManager} from "../../../../Utilities/CustomHooks/useFilterRouteManager";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";


const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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

export const SearchFilter: React.FunctionComponent<ProductFilterProps> = props => {
    const {className} = props;
    const formStyles = useFormStyles();

    const [inputResult, setInputResult] = React.useState<string | number>("");
    const formRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // TODO: Adjust behavior of search field when pressing the clear button
    const {pushToRoute} = useFilterRouteManager(UrlQueryFilter.Search, ProductFilterState.FilterSearch, inputRef, setInputResult);

    const onInputResult = React.useCallback((): void => {
        if (inputResult !== "" && inputResult === inputRef.current?.value) {
            pushToRoute(inputResult);
        }
    }, [inputResult, inputRef, pushToRoute]);

    React.useEffect(() => {
        const timer = setTimeout(() => onInputResult(), 1000);
        return () => clearTimeout(timer);
    }, [onInputResult]);

    React.useEffect(() => {
        formRef.current?.classList.add(className)
    }, [className])

    return (
        <TextField color={"secondary"}
                   id="search-products"
                   label="Search"
                   type="search"
                   variant="outlined"
                   size={"small"}
                   onChange={(event => setInputResult(event.target.value))}
                   className={formStyles.root}
                   inputRef={inputRef}
                   ref={formRef}/>
    )
}
