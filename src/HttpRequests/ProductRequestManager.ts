import {api} from "./AxiosInstance";
import {FullProductType, ProductInformationType} from "../Utilities/ProductModels/FullProductModel";
import {productCardMapper, productModalMapper} from "../Utilities/Mappers/ProductCardMapper";
import {ProductCardProps} from "../Utilities/ProductProps/ProductCardProps";

export type ProductFilterType = {
    sortFilter?: string,
    productType?: string,
    productBrand?: string,
    searchFrag?: string,
    pageNumber: number
}

export class ProductRequestManager {
    private productAmount = 0
    private readonly baseApiUrl: string | undefined;

    constructor(public pageSize: number) {
        this.baseApiUrl = `/Products?PageSize=${pageSize}`;
    }

    public async getProductList({
                                    pageNumber,
                                    sortFilter,
                                    productType,
                                    productBrand,
                                    searchFrag
                                }: ProductFilterType): Promise<ProductCardProps[] | null> {

        const productListUrl = [
            this.baseApiUrl,
            `&PageIndex=${pageNumber}`,
            sortFilter ? `&Sort=${sortFilter}` : "",
            productType ? `&TypeId=${productType}` : "",
            productBrand ? `&BrandId=${productBrand}` : "",
            searchFrag ? `&Search=${searchFrag}` : "",
        ].join("");

        const response = await api.get<FullProductType>(productListUrl);
        this.productAmount = response.data.count;
        return (response.data.data.length === 0) ? null : productCardMapper(response.data);
    }

    public async getProduct(id: number): Promise<ProductCardProps> {
        const response = await api.get<ProductInformationType>(`/products/${id}`);
        return productModalMapper(response.data);
    }

    public getProductPageAmount(): number | never {
        if (!this.productAmount) {
            throw new Error("A request must be done first to the product api in order to get the amount of product generated by the api");
        }
        return Math.ceil(this.productAmount / this.pageSize);
    }
}