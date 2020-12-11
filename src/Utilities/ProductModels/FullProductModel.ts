export type FullProductType = {
    pageIndex: number,
    pageSize: number,
    count: number,
    data: ProductInformationType[]
}

export type ProductInformationType = {
    id: number,
    name: string,
    description: string,
    price: number,
    pictureUrl: string,
    productType: string,
    productBrand: string
}