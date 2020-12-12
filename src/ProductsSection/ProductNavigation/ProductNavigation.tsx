import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";
import {ProductNavigationMobile} from "./ProductsNavigationMobile/ProductNavigationMobile";
import {ProductNavigationDesktop} from "./ProductsNavigationDesktop/ProductNavigationDesktop";
import {ClearFiltersProvider} from "./ClearFiltersContext";

export const ProductNavigation: React.FunctionComponent = () => {
    const mediaQuery = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET}`)

    let nav = mediaQuery ?
        <ProductNavigationMobile/> :
        <ProductNavigationDesktop/>

    return (
            <ClearFiltersProvider>
                {nav}
            </ClearFiltersProvider>
    )
}