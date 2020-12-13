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
    filterValue: string,
    clearFilterFromParams: () => void
}

export const useFilterByQueryParams = (
    queryFilterType: UrlQueryFilter,
    divAnchor: React.RefObject<HTMLDivElement>,
): FilterByParamsHook => {
    const [inputValue, setInputValue] = React.useState(-1);
    const [filterValue, setFilterValue] = React.useState("");
    const {location: {search}} = useHistory();

    // It must return -1 due to technical reasons
    const clearInput = React.useCallback(() => {
        let callSubsequentTime = false;
        return () => {
            if (callSubsequentTime) {
                setInputValue(_ => {
                    manageSelectClassList("remove", divAnchor);
                    return -1;
                });
            } else {
                callSubsequentTime = true;
            }
        }
    }, [divAnchor]);

    const [clearCallback] = React.useState<() => void>(() => clearInput());

    React.useEffect(() => {
        if (search.includes(queryFilterType)) {
            const searchParams = parsePath(search).search;
            const queryValue = new URLSearchParams(searchParams)?.get(queryFilterType);
            setFilterValue(_ => {
                manageSelectClassList("add", divAnchor)
                setInputValue(parseInt(queryValue ?? "0"));
                return queryValue ?? "";
            });
        }
    }, [search, divAnchor, setFilterValue, queryFilterType]);

    return {inputValue, filterValue, clearFilterFromParams: clearCallback};
}
