import {FullProductType} from "../ProductDtos/FullProductDto";
import {ProductCardProps} from "../ProductProps/ProductCardProps";

type ProductCartType = ProductCardProps & {id: number}

export const ProductCardMapper = (fullProduct: FullProductType): ProductCartType[] => {
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