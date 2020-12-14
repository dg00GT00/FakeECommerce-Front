import * as React from "react";
import {ProductFilterEnum, UrlQueryFilter} from "../Routes/ProductRouteManager/ProductRouteManager";
import {ClearFiltersContext} from "../ClearFilterManager/ClearFiltersContext";
import {useProductFilterRoute} from "./useProductFilterRoute";
import {useProductFilterRouteByQuery} from "./useProductFilterRouteByQuery";

type RouteManagerType = { inputValue: number, pushToRoute: (queryValue: string | number) => void }

export const useFilterRouteManager = (
    urlFilterType: UrlQueryFilter,
    productFilterType: ProductFilterEnum,
    formRef: React.RefObject<HTMLDivElement>,
    filterSetValue: React.Dispatch<React.SetStateAction<string | number>>
): RouteManagerType => {
    const {setClearFunction} = React.useContext(ClearFiltersContext);

    const {inputValue, clearFilterFromParams} = useProductFilterRouteByQuery(urlFilterType, formRef);
    const pushToRoute = useProductFilterRoute(urlFilterType, productFilterType, filterSetValue);
    setClearFunction({clearInputFunction: filterSetValue, clearFilterFromParams});

    return {inputValue, pushToRoute}
}