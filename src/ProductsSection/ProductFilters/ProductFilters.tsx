import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";
import {ProductFiltersMobile} from "./ProductsFiltersMobile/ProductFiltersMobile";
import {ProductFiltersDesktop} from "./ProductsFiltersDesktop/ProductFiltersDesktop";
import {ClearFiltersProvider} from "../../Utilities/ClearFilterManager/ClearFiltersContext";

export const ProductFilters: React.FunctionComponent = () => {
    const mediaQuery = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET}`)

    let nav = mediaQuery ? <ProductFiltersMobile/> : <ProductFiltersDesktop/>;

    return <ClearFiltersProvider>{nav}</ClearFiltersProvider>;
}