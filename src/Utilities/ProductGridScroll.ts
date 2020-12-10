export const PRODUCT_GRID_ID = "productsContent";

export const handleScrollGridItems = () => {
    const productFiltersBar = document.getElementById(PRODUCT_GRID_ID);
    productFiltersBar?.scrollIntoView({behavior: "smooth"});
}