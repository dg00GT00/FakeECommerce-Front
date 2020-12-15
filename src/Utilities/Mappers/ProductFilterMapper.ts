import {ProductBrands, ProductSortBy, ProductTypes} from "../ProductModels/ProductFiltersEnum";

export type ProductFilterMapperType = ProductTypes | ProductBrands | ProductSortBy;

export const productFilterEnumToUrl = (filterType: ProductFilterMapperType): string => {
    switch (filterType) {
        case ProductTypes.MenClothing:
            return "1";
        case ProductTypes.Jewelry:
            return "2";
        case ProductTypes.Electronics:
            return "3";
        case ProductTypes.WomenClothing:
            return "4";
        case ProductBrands.MenStyledClothing:
            return "1";
        case ProductBrands.NewJewelry:
            return "2";
        case ProductBrands.SuperElectronic:
            return "3";
        case ProductBrands.WomenStyledClothing:
            return "4";
        case ProductBrands.WomenLoving:
            return "5";
        case ProductBrands.Samsung:
            return "6";
        case ProductSortBy.NameAsc:
            return "0";
        case ProductSortBy.NameDesc:
            return "1";
        case ProductSortBy.PriceAsc:
            return "2";
        case ProductSortBy.PriceDesc:
            return "3";
    }
}