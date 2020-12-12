export type ProductNavDesktopProps = { className: string, clearFilter: number };
export type ProductNavMobileProps = Omit<ProductNavDesktopProps, "className">;