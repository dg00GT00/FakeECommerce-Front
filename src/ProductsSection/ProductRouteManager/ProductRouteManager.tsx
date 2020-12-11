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

type ProductFilterState = {
    filter: ProductFilterEnum
}

type SearchParams = Omit<ProductFilterType, "pageNumber"> & { pageNumber?: number }

function pageNumberParams(searchParams: string) {
    const pageNumber = new URLSearchParams(searchParams)?.get("page");
    return {pageNumber: pageNumber ? +pageNumber : 0};
}

const parseSearchParams = (locationState: ProductFilterState, searchParams: string): SearchParams => {
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
            return pageNumberParams(searchParams);
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
