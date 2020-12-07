import {ProductApi} from "./AxiosInstance";
import {FullProductType} from "../Utilities/ProductDtos/FullProductDto";
import {productCardMapper, ProductCartType} from "../Utilities/Mappers/ProductCardMapper";

export class ProductRequestManager {
    private requestCount = 0
    private pageIndex = 1
    private productListWrapper: (() => Promise<void>) | null = null
    private productList: ProductCartType[] | null = null

    constructor(private pageSize: number) {
    }

    private async getProductList(): Promise<ProductCartType[] | null> {
        const response = await ProductApi.get<FullProductType>(`/Products?PageSize=${this.pageSize}&PageIndex=${this.pageIndex}`);
        this.requestCount = response.data.count;
        return (response.data.data.length === 0) ? null : productCardMapper(response.data);
    }

    private async getProductClosure(): Promise<() => Promise<void>> {
        this.productList = await this.getProductList();
        return async () => {
            if ((this.requestCount - this.pageSize) > 0) {
                ++this.pageIndex;
                this.pageSize = this.pageSize * 2;
                this.productList = await this.getProductList();
            } else {
                this.productList = null;
            }
        }
    }

    public async getFullProductList(): Promise<ProductCartType[] | null> {
        if (!this.productListWrapper) {
            this.productListWrapper = await this.getProductClosure();
            return this.productList;
        }
        await this.productListWrapper();
        return this.productList;
    }
}