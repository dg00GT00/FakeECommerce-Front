import * as React from "react";
import {ProductRequestManager} from "../../HttpRequests/ProductsRequests";
import {ProductCard} from "../ProductCard/ProductCard";
import {ProductRouteValidation} from "../../Utilities/RouterValidation/ProductRouteValidation";

// const productRequest = new ProductRequestManager(12);

export const ProductGrid: React.FunctionComponent = () => {
    const [productGridItems, setProductGrid] = React.useState<React.FunctionComponentElement<typeof ProductRouteValidation> | null>(null);
    const productRequest = React.useRef(new ProductRequestManager(12)).current;

    React.useEffect(() => {
        productRequest
            .getFullProductList()
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
                        <ProductRouteValidation pageAmount={productRequest.getPageAmount()}>
                            {productItems}
                        </ProductRouteValidation>
                    )
                });
            })
    }, [productRequest]);

    return <>{productGridItems}</>
}