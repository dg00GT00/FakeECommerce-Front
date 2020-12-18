import * as React from "react";
import {useFilterRouteManager} from "./useFilterRouteManager";
import {FilterOptions, ProductFilterState} from "../ProductModels/ProductFiltersEnum";

export const useSearch = (inputRef: React.RefObject<HTMLInputElement>): React.Dispatch<React.SetStateAction<string | number>> => {
    const [inputResult, setInputResult] = React.useState<string | number>("");
    const {pushToRoute} = useFilterRouteManager(FilterOptions.Search, ProductFilterState.FilterSearch, inputRef, setInputResult);

    const onInputResult = React.useCallback((): void => {
        if (inputResult !== "" && inputResult === inputRef.current?.value) {
            pushToRoute(inputResult);
        }
    }, [inputResult, inputRef, pushToRoute]);

    React.useEffect(() => {
        const timer = setTimeout(() => onInputResult(), 1000);
        return () => clearTimeout(timer);
    }, [onInputResult]);

    return setInputResult;
}