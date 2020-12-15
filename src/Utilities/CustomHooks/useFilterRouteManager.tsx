import * as React from "react";
import {ClearFiltersContext} from "../ClearFilterManager/ClearFiltersContext";
import {useProductFilterRoute} from "./useProductFilterRoute";
import {useProductFilterRouteByQuery} from "./useProductFilterRouteByQuery";
import {ProductFilterState, UrlQueryFilter} from "../ProductModels/ProductFiltersEnum";

type RouteManagerType = { inputValue: number, pushToRoute: (queryValue: string | number) => void }

export const useFilterRouteManager = (
    urlFilterType: UrlQueryFilter,
    productFilterType: ProductFilterState,
    formRef: React.RefObject<HTMLDivElement>,
    filterSetValue: React.Dispatch<React.SetStateAction<string | number>>
): RouteManagerType => {
    const {setClearFunction} = React.useContext(ClearFiltersContext);

    const {inputValue, clearFilterFromParams} = useProductFilterRouteByQuery(urlFilterType, formRef);
    const pushToRoute = useProductFilterRoute(urlFilterType, productFilterType, filterSetValue);
    setClearFunction({clearInputFunction: filterSetValue, clearFilterFromParams});

    return {inputValue, pushToRoute};
}