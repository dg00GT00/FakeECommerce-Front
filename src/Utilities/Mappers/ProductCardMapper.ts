import {FullProductType} from "../ProductDtos/FullProductDto";
import {ProductCardProps} from "../ProductProps/ProductCardProps";

export const ProductCardMapper = (fullProduct: FullProductType): ProductCardProps[] => {
    return fullProduct.data.map(product => {
        return {
            name: product.name,
            description: product.description,
            pictureUrl: product.pictureUrl,
            price: product.price,
        }
    })
}