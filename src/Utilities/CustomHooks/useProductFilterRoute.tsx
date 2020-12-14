import {useHistory, useParams} from "react-router-dom"
import {ProductFilterEnum, UrlQueryFilter} from "../Routes/ProductRouteManager/ProductRouteManager";
import {ProductBrands, ProductSortBy, ProductTypes} from "../ProductModels/ProductFilters";
import * as React from "react";

type QueryValueType = string | number | ProductTypes | ProductBrands | ProductSortBy;

let queryObj: { [i: string]: string} = {};

export const useProductFilterRoute = (
    queryType: UrlQueryFilter,
    filterType: ProductFilterEnum,
    setFilterValue: React.Dispatch<React.SetStateAction<string | number>>
): (queryValue: QueryValueType) => void => {
    const params = useParams();
    const {push} = useHistory();

    return (queryValue: QueryValueType): void => {
        if (params) {
            for (const [key, value] of new URLSearchParams(params).entries()) {
                queryObj[key] = value;
            }
            queryObj = {...queryObj, [queryType]: queryValue.toString()};
        }
        console.log("Query: ", queryObj);
        setFilterValue(queryValue);
        push({
            pathname: "/products",
            search: new URLSearchParams(queryObj).toString(),
            state: {filter: [filterType]}
        });
    }
}