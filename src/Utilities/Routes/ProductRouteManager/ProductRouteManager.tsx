import * as React from "react";
import {Route} from "react-router-dom";
import {ProductGridItems} from "../../../ProductsSection/ProductGridItems/ProductGridItems";
import {ProductFilterType} from "../../../HttpRequests/ProductsRequests";
import {
    FilterOptions,
    ProductBrands,
    ProductFilterState,
    ProductSortBy,
    ProductTypes
} from "../../ProductModels/ProductFiltersEnum";
import {productFilterEnumToUrl} from "../../Mappers/ProductFilterMapper";

type FilterState = {
    filter: ProductFilterState[]
}

type SearchParams = Omit<ProductFilterType, "pageNumber"> & { pageNumber?: number }

let filterParams: SearchParams = {};

const newLocationState: FilterState = {filter: []};

// Eliminates the 'pageNumber' object key in order to let the product filter values act on the whole set of products
const resetPageNumber: SearchParams = {pageNumber: undefined};

function parseSearchParams(locationState: FilterState, searchParams: string): SearchParams {
    // Need to check if the state is defined case the user input url search parameter direct to the url
    if (!locationState) {
        if (searchParams.includes(FilterOptions.Search)) {
            newLocationState.filter.push(ProductFilterState.FilterSearch);
        }
        if (searchParams.includes(FilterOptions.Type)) {
            newLocationState.filter.push(ProductFilterState.FilterType);
        }
        if (searchParams.includes(FilterOptions.Sort)) {
            newLocationState.filter.push(ProductFilterState.FilterSort);
        }
        if (searchParams.includes(FilterOptions.Brand)) {
            newLocationState.filter.push(ProductFilterState.FilterBrand);
        }
        if (searchParams.includes(FilterOptions.Clear)) {
            newLocationState.filter.push(ProductFilterState.Clear);
        }
        if (searchParams.includes(FilterOptions.Page)) {
            newLocationState.filter.push(ProductFilterState.FilterPageNumber);
        }
    }
    (locationState ?? newLocationState).filter.forEach(filter => {
        if (filter === ProductFilterState.FilterSearch) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                searchFrag: new URLSearchParams(searchParams)?.get(FilterOptions.Search) ?? filterParams.searchFrag
            };
        }
        if (filter === ProductFilterState.FilterType) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productType: productFilterEnumToUrl((new URLSearchParams(searchParams)?.get(FilterOptions.Type) as ProductTypes)) ?? filterParams.productType
            };
        }
        if (filter === ProductFilterState.FilterSort) {
            const sort = new URLSearchParams(searchParams)?.get(FilterOptions.Sort);
            filterParams = {
                ...filterParams,
                sortFilter: productFilterEnumToUrl((sort as ProductSortBy)) ?? filterParams.sortFilter
            };
        }
        if (filter === ProductFilterState.FilterBrand) {
            filterParams = {
                ...filterParams,
                ...resetPageNumber,
                productBrand: productFilterEnumToUrl((new URLSearchParams(searchParams)?.get(FilterOptions.Brand) as ProductBrands)) ?? filterParams.productBrand
            };
        }
        if (filter === ProductFilterState.FilterPageNumber) {
            const pageNumber = new URLSearchParams(searchParams)?.get(FilterOptions.Page);
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
                const params = parseSearchParams((state as FilterState), search);
                return <ProductGridItems {...params} pageNumber={params.pageNumber || 1}/>
            }}/>
        </>
    )
}
