import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {NotFound} from "../../Utilities/RouterValidation/NotFound";
import {ProductsContext} from "../ProductContext/ProductsContext";
import {ProductGridSkeleton} from "../ProductGridSkeleton/ProductGridSkeleton";
import {RouteComponentProps, withRouter} from "react-router-dom";

type GridItemsType =
    React.FunctionComponentElement<typeof ProductCard>[]
    | React.FunctionComponentElement<typeof NotFound>;

const ProductGrid: React.FunctionComponent<RouteComponentProps & { pageNumber: number }> = ({pageNumber, ...props}) => {
    const {productReq, setPageCount, setPageNumber, checkHomePageToggle} = React.useContext(ProductsContext);
    const [productGridItems, setProductGrid] = React.useState<GridItemsType | null>(null);
    const [isLoading, toggleLoading] = React.useState(true);

    if (props.location.pathname === "/") {
        checkHomePageToggle(true);
    } else {
        checkHomePageToggle(false);
    }

    React.useEffect(() => {
        productReq
            .getFullProductList(pageNumber)
            .then(productList => {
                const productItems = productList?.map(product => {
                    return <ProductCard key={product.id} {...product}/>
                })
                setPageCount(productReq.getProductPageAmount());
                setPageNumber(pageNumber);
                toggleLoading(false);
                setProductGrid(productItems ?? null);
            })
            .catch(() => {
                setProductGrid(<NotFound/>);
            })
    }, [productReq, pageNumber, setPageCount, setPageNumber]);

    return <>{isLoading ? <ProductGridSkeleton skeletonItems={productReq.pageSize}/> : productGridItems}</>
}

export const ProductGridItems = withRouter(ProductGrid);