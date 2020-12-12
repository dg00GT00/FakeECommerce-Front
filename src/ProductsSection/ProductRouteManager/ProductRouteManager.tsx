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

const parseSearchParams = (locationState: ProductFilterState, searchParams: string): SearchParams => {
    if (!locationState) {
        if (searchParams.includes("search")) {
            locationState = {filter: ProductFilterEnum.FilterSearch};
        } else if (searchParams.includes("type")) {
            locationState = {filter: ProductFilterEnum.FilterType};
        } else if (searchParams.includes("sort")) {
            locationState = {filter: ProductFilterEnum.FilterSort};
        } else if (searchParams.includes("brand")) {
            locationState = {filter: ProductFilterEnum.FilterBrand};
        } else {
            locationState = {filter: ProductFilterEnum.FilterPageNumber};
        }
    }
    switch (locationState.filter) {
        case ProductFilterEnum.FilterSearch:
            return {searchFrag: new URLSearchParams(searchParams)?.get("search") ?? ""};
        case ProductFilterEnum.FilterType:
            return {productType: new URLSearchParams(searchParams)?.get("type") ?? ""};
        case ProductFilterEnum.FilterSort:
            const sort = new URLSearchParams(searchParams)?.get("sort");
            return {sortFilter: sort ? +sort : 0};
        case ProductFilterEnum.FilterBrand:
            return {productBrand: new URLSearchParams(searchParams)?.get("brand") ?? ""};
        case ProductFilterEnum.FilterPageNumber:
            const pageNumber = new URLSearchParams(searchParams)?.get("page");
            return {pageNumber: pageNumber ? +pageNumber : 0};
    }
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
