import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {NotFound} from "../../Utilities/RouterValidation/NotFound";
import {ProductsContext} from "../ProductContext/ProductsContext";

type GridItemsType =
    React.FunctionComponentElement<typeof ProductCard>[]
    | React.FunctionComponentElement<typeof NotFound>;

export const ProductGridItems: React.FunctionComponent<{ pageNumber: number }> = ({pageNumber}) => {
    const {productReq, setPageCount, setPageNumber} = React.useContext(ProductsContext);
    const [productGridItems, setProductGrid] = React.useState<GridItemsType | null>(null);

    React.useEffect(() => {
        productReq
            .getFullProductList(pageNumber)
            .then(productList => {
                const productItems = productList?.map(product => {
                    return <ProductCard key={product.id} {...product}/>
                })
                setPageCount(productReq.getProductPageAmount());
                setPageNumber(pageNumber);
                setProductGrid(productItems ?? null);
            })
            .catch(() => {
                setProductGrid(<NotFound/>);
            })
    }, [productReq, pageNumber, setPageCount, setPageNumber]);

    return <>{productGridItems}</>
}