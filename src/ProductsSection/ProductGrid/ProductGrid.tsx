import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {ProductRouteValidation} from "../../Utilities/RouterValidation/ProductRouteValidation";
import {ProductCartType} from "../../Utilities/Mappers/ProductCardMapper";

type ProductGridProps = {
    validateHome?: boolean,
    pageAmount: () => number,
    productRequest: () => Promise<ProductCartType[] | null>
}

export const ProductGrid: React.FunctionComponent<ProductGridProps> = ({validateHome = true, ...props}) => {
    const [productGridItems, setProductGrid] = React.useState<React.FunctionComponentElement<typeof ProductRouteValidation> | null>(null);
    const {productRequest, pageAmount} = props;

    React.useEffect(() => {
        productRequest()
            .then(productList => {
                const productItems = productList?.map(product => {
                    return <ProductCard {...product}/>
                })
                setProductGrid(_ => {
                    return (
                        <ProductRouteValidation validateHome pageAmount={pageAmount()}>
                            {productItems}
                        </ProductRouteValidation>
                    )
                });
            })
    }, [pageAmount, productRequest]);

    return <>{productGridItems}</>
}