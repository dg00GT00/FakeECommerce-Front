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
    filter: ProductFilterEnum[]
}

type SearchParams = Omit<ProductFilterType, "pageNumber"> & { pageNumber?: number }

let filterParams: SearchParams = {};

const newLocationState: ProductFilterState = {filter: []};

// Eliminates the 'pageNumber' object key in order to let the product filter values act on the whole set of products
const resetPageNumber: SearchParams = {pageNumber: undefined};

function parseSearchParams(locationState: ProductFilterState, searchParams: string): SearchParams {
    // Need to check if the state is defined case the user input url search parameter direct to the url
    if (!locationState) {
        if (searchParams.includes(UrlQueryFilter.Search)) {
            newLocationState.filter.push(ProductFilterEnum.FilterSearch);
        }
        if (searchParams.includes(UrlQueryFilter.Type)) {
            newLocationState.filter.push(ProductFilterEnum.FilterType);
        }
        if (searchParams.includes(UrlQueryFilter.Sort)) {
            newLocationState.filter.push(ProductFilterEnum.FilterSort);
        }
        if (searchParams.includes(UrlQueryFilter.Brand)) {
            newLocationState.filter.push(ProductFilterEnum.FilterBrand);
        }
        if (searchParams === `?${UrlQueryFilter.Clear}`) {
            newLocationState.filter.push(ProductFilterEnum.Clear);
        }
        if (searchParams.includes(UrlQueryFilter.Page)) {
            newLocationState.filter.push(ProductFilterEnum.FilterPageNumber);
        }
    }
    (locationState ?? newLocationState).filter.forEach(filter => {
        if (filter === ProductFilterEnum.FilterSearch) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                searchFrag: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Search) ?? filterParams.searchFrag
            };
        }
        if (filter === ProductFilterEnum.FilterType) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productType: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Type) ?? filterParams.productType
            };
        }
        if (filter === ProductFilterEnum.FilterSort) {
            const sort = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Sort);
            filterParams = {...filterParams, sortFilter: sort ? +sort : filterParams.sortFilter};
        }
        if (filter === ProductFilterEnum.FilterBrand) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productBrand: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Brand) ?? filterParams.productBrand
            };
        }
        if (filter === ProductFilterEnum.FilterPageNumber) {
            const pageNumber = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Page);
            filterParams = {...filterParams, pageNumber: pageNumber ? +pageNumber : undefined};
        }
        if (filter === ProductFilterEnum.Clear) {
            filterParams = filterParams.pageNumber ? {pageNumber: filterParams.pageNumber} : {};
        }
    });
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
