import {FullProductType} from "../ProductModels/FullProductModel";
import {ProductCardProps} from "../ProductProps/ProductCardProps";

export const productCardMapper = (fullProduct: FullProductType): ProductCardProps[] => {
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