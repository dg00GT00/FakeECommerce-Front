import {FullProductType} from "../ProductModels/FullProductModel";
import {ProductCardProps} from "../ProductProps/ProductCardProps";

export type ProductCartType = ProductCardProps & {id: number}

export const productCardMapper = (fullProduct: FullProductType): ProductCartType[] => {
    return fullProduct.data.map(product => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            pictureUrl: product.pictureUrl,
            price: product.price,
        }
    })
}