import * as React from "react";
import {useHistory} from "react-router-dom"
import {
    ProductBrands,
    ProductFilterState,
    ProductSortBy,
    ProductTypes,
    UrlQueryFilter
} from "../ProductModels/ProductFiltersEnum";

type QueryValueType = string | number | ProductTypes | ProductBrands | ProductSortBy;

let queryObj: { [i: string]: string } = {};

export const useProductFilterRoute = (
    queryType: UrlQueryFilter,
    filterType: ProductFilterState,
    setFilterValue?: React.Dispatch<React.SetStateAction<string | number>>
): (queryValue?: QueryValueType) => void => {
    const {push} = useHistory();

    return (queryValue?: QueryValueType): void => {
        let search;

        if (queryValue && setFilterValue) {
            queryObj = {...queryObj, [queryType]: queryValue.toString()};
            setFilterValue(queryValue);
            search = new URLSearchParams(queryObj).toString();
        } else {
            queryObj = {};
            search = new URLSearchParams({[queryType]: queryType}).toString();
        }
        push({
            pathname: "/products",
            search: new URLSearchParams(search).toString(),
            state: {filter: [filterType]}
        });
    }
}