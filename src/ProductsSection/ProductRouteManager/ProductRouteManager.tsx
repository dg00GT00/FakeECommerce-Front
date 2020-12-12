import * as React from "react";
import {Route} from "react-router-dom";
import {ProductGridItems} from "../ProductGridItems/ProductGridItems";
import {ProductFilterType} from "../../HttpRequests/ProductsRequests";

export enum ProductFilterEnum {
    FilterSearch,
    FilterType,
    FilterSort,
    FilterBrand,
    FilterPageNumber,
    Clear
}

export enum UrlQueryFilter {
    Search = "search",
    Type = "type",
    Sort = "sort",
    Brand = "brand",
    Page = "page",
    Clear = "clear"
}

type ProductFilterState = {
    filter: ProductFilterEnum
}

type SearchParams = Omit<ProductFilterType, "pageNumber"> & { pageNumber?: number }

let filterParams: SearchParams = {};

const parseSearchParams = (locationState: ProductFilterState, searchParams: string): SearchParams => {
    // Need to check if the state is defined case the user input url search parameter direct to the url
    if (!locationState) {
        if (searchParams.includes(UrlQueryFilter.Search)) {
            locationState = {filter: ProductFilterEnum.FilterSearch};
        } else if (searchParams.includes(UrlQueryFilter.Type)) {
            locationState = {filter: ProductFilterEnum.FilterType};
        } else if (searchParams.includes(UrlQueryFilter.Sort)) {
            locationState = {filter: ProductFilterEnum.FilterSort};
        } else if (searchParams.includes(UrlQueryFilter.Brand)) {
            locationState = {filter: ProductFilterEnum.FilterBrand};
        } else if (searchParams === `?${UrlQueryFilter.Clear}`) {
            locationState = {filter: ProductFilterEnum.Clear}
        } else if (searchParams.includes(UrlQueryFilter.Page)) {
            locationState = {filter: ProductFilterEnum.FilterPageNumber};
        } else {
            // Case any of previous checks succeed, case an error on url validation
            return {pageNumber: Infinity};
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
            const pageNumber = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Page);
            filterParams = {...filterParams, pageNumber: pageNumber ? +pageNumber : 0};
            break;
        case ProductFilterEnum.Clear:
            filterParams = filterParams.pageNumber ? {pageNumber: filterParams.pageNumber} : {};
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
