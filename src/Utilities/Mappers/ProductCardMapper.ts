import {FullProductType, ProductInformationType} from "../ProductModels/FullProductModel";
import {ProductCardProps} from "../ProductProps/ProductCardProps";

export const productCardMapper = (fullProduct: FullProductType): ProductCardProps[] => {
    return fullProduct.data.map(product => {
        return {
            id: product.id,
            productName: product.name,
            description: product.description,
            pictureUrl: product.pictureUrl,
            price: product.price,
            brand: product.productBrand,
            type: product.productType
        }
    })
}

export const productModalMapper = (product: ProductInformationType): ProductCardProps => {
    return {
        id: product.id,
        description: product.description,
        brand: product.productBrand,
        pictureUrl: product.pictureUrl,
        price: product.price,
        productName: product.name,
        type: product.productType
    }
}