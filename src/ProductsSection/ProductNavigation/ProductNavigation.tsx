import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";
import {ProductNavigationMobile} from "./ProductsNavigationMobile/ProductNavigationMobile";
import {ProductNavigationDesktop} from "./ProductsNavigationDesktop/ProductNavigationDesktop";

export const ProductNavigation: React.FunctionComponent = () => {
    const mediaQuery = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET}`)
    return mediaQuery ?
        <ProductNavigationMobile/> :
        <ProductNavigationDesktop/>
}