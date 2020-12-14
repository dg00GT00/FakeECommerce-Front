/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {parsePath} from "history";
import {UrlQueryFilter} from "../Routes/ProductRouteManager/ProductRouteManager";
import {useHistory} from "react-router-dom";

const manageSelectClassList = (action: "remove" | "add", divAnchor: React.RefObject<HTMLDivElement>): void => {
    const label = divAnchor.current?.querySelector("label");
    if (label) {
        label.setAttribute("data-shrink", "true");
        label.classList[action]("MuiInputLabel-shrink", "MuiFormLabel-filled");
    }
    const legend = divAnchor.current?.querySelector("legend");
    if (legend) {
        legend.classList[action]("PrivateNotchedOutline-legendNotched-12");
    }
}

type FilterByParamsHook = {
    inputValue: number,
    clearFilterFromParams: () => void
}

export const useProductFilterRouteByQuery = (
    queryFilterType: UrlQueryFilter,
    divAnchor: React.RefObject<HTMLDivElement>,
): FilterByParamsHook => {
    const [inputValue, setInputValue] = React.useState(-1);
    const {location: {search}} = useHistory();

    // It must return -1 due to technical reasons
    const clearInput = React.useCallback(() => {
        let callSubsequentTime = false;
        return () => {
            if (callSubsequentTime) {
                manageSelectClassList("remove", divAnchor);
                setInputValue(-1);
            } else {
                callSubsequentTime = true;
            }
        }
    }, [divAnchor]);

    const [clearFilterFromParams] = React.useState<() => void>(() => clearInput());

    React.useEffect(() => {
        if (search.includes(queryFilterType)) {
            const searchParams = parsePath(search).search;
            const queryValue = new URLSearchParams(searchParams)?.get(queryFilterType);
            manageSelectClassList("add", divAnchor)
            setInputValue(parseInt(queryValue ?? "0"));
        }
    }, [search, divAnchor, queryFilterType]);

    return {inputValue, clearFilterFromParams};
}
