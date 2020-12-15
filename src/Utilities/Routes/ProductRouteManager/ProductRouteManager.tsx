import * as React from "react";
import {Route} from "react-router-dom";
import {ProductGridItems} from "../../../ProductsSection/ProductGridItems/ProductGridItems";
import {ProductFilterType} from "../../../HttpRequests/ProductsRequests";
import {ProductFilterState, UrlQueryFilter} from "../../ProductModels/ProductFiltersEnum";

type ProductFilterState = {
    filter: ProductFilterState[]
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
            newLocationState.filter.push(ProductFilterState.FilterSearch);
        }
        if (searchParams.includes(UrlQueryFilter.Type)) {
            newLocationState.filter.push(ProductFilterState.FilterType);
        }
        if (searchParams.includes(UrlQueryFilter.Sort)) {
            newLocationState.filter.push(ProductFilterState.FilterSort);
        }
        if (searchParams.includes(UrlQueryFilter.Brand)) {
            newLocationState.filter.push(ProductFilterState.FilterBrand);
        }
        if (searchParams.includes(UrlQueryFilter.Clear)) {
            newLocationState.filter.push(ProductFilterState.Clear);
        }
        if (searchParams.includes(UrlQueryFilter.Page)) {
            newLocationState.filter.push(ProductFilterState.FilterPageNumber);
        }
    }
    (locationState ?? newLocationState).filter.forEach(filter => {
        if (filter === ProductFilterState.FilterSearch) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                searchFrag: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Search) ?? filterParams.searchFrag
            };
        }
        if (filter === ProductFilterState.FilterType) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productType: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Type) ?? filterParams.productType
            };
        }
        if (filter === ProductFilterState.FilterSort) {
            const sort = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Sort);
            filterParams = {...filterParams, sortFilter: sort ? +sort : filterParams.sortFilter};
        }
        if (filter === ProductFilterState.FilterBrand) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productBrand: new URLSearchParams(searchParams)?.get(UrlQueryFilter.Brand) ?? filterParams.productBrand
            };
        }
        if (filter === ProductFilterState.FilterPageNumber) {
            const pageNumber = new URLSearchParams(searchParams)?.get(UrlQueryFilter.Page);
            filterParams = {...filterParams, pageNumber: pageNumber ? +pageNumber : undefined};
        }
        if (filter === ProductFilterState.Clear) {
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
