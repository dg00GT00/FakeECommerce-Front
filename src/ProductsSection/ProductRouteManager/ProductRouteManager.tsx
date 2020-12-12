import * as React from "react";
import {Route} from "react-router-dom";
import {ProductGridItems} from "../ProductGridItems/ProductGridItems";
import {ProductFilterType} from "../../HttpRequests/ProductsRequests";

export enum ProductFilterEnum {
    FilterSearch,
    FilterType,
    FilterSort,
    FilterBrand,
    FilterPageNumber
}

export enum UrlQueryFilter {
    Search = "search",
    Type = "type",
    Sort = "sort",
    Brand = "brand"
}

type ProductFilterState = {
    filter: ProductFilterEnum
}

type SearchParams = Omit<ProductFilterType, "pageNumber"> & { pageNumber?: number }

let filterParams = {};

const parseSearchParams = (locationState: ProductFilterState, searchParams: string): SearchParams => {
    if (!locationState) {
        if (searchParams.includes(UrlQueryFilter.Search)) {
            locationState = {filter: ProductFilterEnum.FilterSearch};
        } else if (searchParams.includes(UrlQueryFilter.Type)) {
            locationState = {filter: ProductFilterEnum.FilterType};
        } else if (searchParams.includes(UrlQueryFilter.Sort)) {
            locationState = {filter: ProductFilterEnum.FilterSort};
        } else if (searchParams.includes(UrlQueryFilter.Brand)) {
            locationState = {filter: ProductFilterEnum.FilterBrand};
        } else {
            locationState = {filter: ProductFilterEnum.FilterPageNumber};
        }
    }
    switch (locationState.filter) {
        case ProductFilterEnum.FilterSearch:
            filterParams = {
                ...filterParams,
                searchFrag: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Search) ?? ""
            };
            break;
        case ProductFilterEnum.FilterType:
            filterParams = {
                ...filterParams,
                productType: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Type) ?? ""
            };
            break;
        case ProductFilterEnum.FilterSort:
            const sort = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Sort);
            filterParams = {...filterParams, sortFilter: sort ? +sort : 0};
            break;
        case ProductFilterEnum.FilterBrand:
            filterParams = {
                ...filterParams,
                productBrand: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Brand) ?? ""
            };
            break;
        case ProductFilterEnum.FilterPageNumber:
            const pageNumber = new URLSearchParams(searchParams)?.get("page");
            filterParams = {...filterParams, pageNumber: pageNumber ? +pageNumber : 0};
            break;
    }
    return filterParams;
}

export const ProductRouteManager: React.FunctionComponent<ProductFilterType> = props => {
    return (
        <>
            <Route exact path={"/"}>
                <ProductGridItems pageNumber={props.pageNumber}/>
            </Route>
            <Route path={"/products"} render={({location: {state, search}}) => {
                const params = parseSearchParams((state as ProductFilterState), search);
                return <ProductGridItems {...params} pageNumber={params.pageNumber || 1}/>
            }}/>
        </>
    )
}
