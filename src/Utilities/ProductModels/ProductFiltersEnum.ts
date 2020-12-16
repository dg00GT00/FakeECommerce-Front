export enum ProductSortBy {
    NameAsc= "alphabetically",
    NameDesc= "reverse alphabetically",
    PriceAsc = "lower price",
    PriceDesc = "higher price"
}

export enum ProductTypes {
    MenClothing = "men clothing",
    Jewelry = "jewelry",
    Electronics = "electronic",
    WomenClothing = "women clothing"
}

export enum ProductBrands {
    MenStyledClothing = "men styled clothing",
    NewJewelry = "new jewelry",
    SuperElectronic = "super electronic",
    WomenStyledClothing = "women styled clothing",
    WomenLoving = "women loving",
    Samsung = "samsung"
}

export enum ProductFilterState {
    FilterSearch,
    FilterType,
    FilterSort,
    FilterBrand,
    FilterPageNumber,
    Clear
}

export enum FilterOptions {
    Search = "search",
    Type = "type",
    Sort = "sort",
    Brand = "brand",
    Page = "page",
    Clear = "clear"
}