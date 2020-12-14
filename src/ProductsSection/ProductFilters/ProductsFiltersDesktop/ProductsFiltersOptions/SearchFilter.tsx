import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ProductFilterProps} from '../../ProductFilterTypes';


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
    // const {className} = props;
    // const formStyles = useFormStyles();
    //
    // const {push, replace, location: {search, pathname}} = useHistory();
    // const [inputResult, setInputResult] = React.useState("");
    // const formRef = React.useRef<HTMLDivElement>(null);
    // const inputRef = React.useRef<HTMLInputElement>(null);
    //
    // const onInputResult = React.useCallback((): void => {
    //     if (inputResult !== "" && inputResult === inputRef.current?.value) {
    //         const fullPathName = (pathname ? pathname : "/products") + search;
    //         productRouteNavigation(UrlQueryFilter.Search, ProductFilterEnum.FilterSearch, inputResult, push, fullPathName);
    //     }
    //     // if (inputResult === "" && inputResult === inputRef.current?.value) {
    //     //     replace("/");
    //     // }
    // }, [inputResult, inputRef, push, replace])
    //
    // React.useEffect(() => {
    //     const timer = setTimeout(() => onInputResult(), 500);
    //     return () => clearTimeout(timer);
    //
    // }, [onInputResult]);
    //
    // React.useEffect(() => {
    //     formRef.current?.classList.add(className)
    // }, [className])

    return ( <div/>
        // <TextField color={"secondary"}
        //            id="search-products"
        //            label="Search"
        //            type="search"
        //            variant="outlined"
        //            size={"small"}
        //            onChange={(event => setInputResult(event.target.value))}
        //            className={formStyles.root}
        //            inputRef={inputRef}
        //            ref={formRef}/>
    )
}
