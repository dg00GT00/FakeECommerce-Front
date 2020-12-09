import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {ProductRouteValidation} from "../../Utilities/RouterValidation/ProductRouteValidation";
import {ProductCartType} from "../../Utilities/Mappers/ProductCardMapper";

type ProductGridProps = {
    pageAmount: () => number,
    productRequest: () => Promise<ProductCartType[] | null>
}

export const ProductGrid: React.FunctionComponent<ProductGridProps> = props => {
    const [productGridItems, setProductGrid] = React.useState<React.FunctionComponentElement<typeof ProductRouteValidation> | null>(null);
    const {productRequest, pageAmount} = props;

    React.useEffect(() => {
        productRequest()
            .then(productList => {
                const productItems = productList?.map(product => {
                    const {name, description, pictureUrl, price, id} = product
                    return <ProductCard
                        key={id}
                        name={name}
                        description={description}
                        pictureUrl={pictureUrl}
                        price={price}/>
                })
                setProductGrid(_ => {
                    return (
                        <ProductRouteValidation pageAmount={pageAmount()}>
                            {productItems}
                        </ProductRouteValidation>
                    )
                });
            })
    }, [pageAmount, productRequest]);

    return <>{productGridItems}</>
}