import {ProductApi} from "./AxiosInstance";
import {FullProductType} from "../Utilities/ProductModels/FullProductDto";
import {productCardMapper, ProductCartType} from "../Utilities/Mappers/ProductCardMapper";


export class ProductRequestManager {
    private productAmount = 0

    constructor(public pageSize: number) {
    }

    public async getFullProductList(pageIndex: number): Promise<ProductCartType[] | null> {
        const response = await ProductApi.get<FullProductType>(`/Products?PageSize=${this.pageSize}&PageIndex=${pageIndex}`);
        this.productAmount = response.data.count;
        return (response.data.data.length === 0) ? null : productCardMapper(response.data);
    }

    public getProductPageAmount(): number | never {
        if (!this.productAmount) {
            throw new Error("A request must be done first to the product api in order to get the amount of product generated by the api");
        }
        return Math.ceil(this.productAmount / this.pageSize);
    }
}