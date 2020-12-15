export enum ProductSortBy {
    NameAsc,
    NameDesc,
    PriceAsc,
    PriceDesc
}

export enum ProductTypes {
    MenClothing = 1,
    Jewelry,
    Electronics,
    WomenClothing
}

export enum ProductBrands {
    MenStyledClothing = 1,
    NewJewelry,
    SuperElectronic,
    WomenStyledClothing,
    WomenLoving,
    Samsung
}

export enum ProductFilterState {
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