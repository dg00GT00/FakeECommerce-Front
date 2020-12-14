import {ProductFilterEnum, UrlQueryFilter} from "./ProductRouteManager";
import {LocationDescriptor} from "history";
import {ProductBrands, ProductSortBy, ProductTypes} from "../../ProductModels/ProductFilters";

export const productRouteNavigation = (
    queryType: UrlQueryFilter,
    filterType: ProductFilterEnum,
    queryValue: string | number | ProductTypes | ProductBrands | ProductSortBy,
    routeAction: (options: LocationDescriptor) => void,
    pathname: string
): void => {
    routeAction({
        pathname: pathname,
        search: `${queryType}=${queryValue}`,
        state: {filter: [filterType]}
    });
}