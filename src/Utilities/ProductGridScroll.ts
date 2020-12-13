export const PRODUCT_GRID_ID = "productsContent";

/**
 * Automatically scrolls to the filters and search bar
 */
export const handleScrollGridItems = (): void => {
    const productFiltersBar = document.getElementById(PRODUCT_GRID_ID);
    productFiltersBar?.scrollIntoView({behavior: "smooth"});
}