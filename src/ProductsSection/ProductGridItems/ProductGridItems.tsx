import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {NotFound} from "../../Utilities/RouterValidation/NotFound";
import {ProductsContext} from "../ProductContext/ProductsContext";
import {ProductGridSkeleton} from "../ProductGridSkeleton/ProductGridSkeleton";
import {withRouter} from "react-router-dom";
import {ProductRouteManagerProps} from "../ProductRouteManager/ProductRouteManagerProps";

type GridItemsType =
    React.FunctionComponentElement<typeof ProductCard>[]
    | React.FunctionComponentElement<typeof NotFound>;

const ProductGrid: React.FunctionComponent<ProductRouteManagerProps> = ({location: {pathname}, ...props}) => {
    // Deconstruct the props in order to prevent infinity request loop
    const {pageNumber, searchFrag, productBrand, productType, sortFilter} = props;
    const {productReq, setPageCount, setPageNumber, checkHomePageToggle} = React.useContext(ProductsContext);
    const [productGridItems, setProductGrid] = React.useState<GridItemsType | null>(null);
    const [isLoading, toggleLoading] = React.useState(true);

    React.useEffect(() => {
        if (pathname === "/") {
            checkHomePageToggle(true);
        } else {
            checkHomePageToggle(false);
        }
        productReq
            .getProductList({pageNumber, searchFrag, productBrand, productType, sortFilter})
            .then(productList => {
                const productItems = productList?.map(product => {
                    return <ProductCard key={product.id} {...product}/>
                })
                setPageCount(productReq.getProductPageAmount());
                setPageNumber(pageNumber);
                toggleLoading(false);
                setProductGrid(productItems ?? <NotFound/>);
            })
            .catch(() => {
                toggleLoading(false);
                setProductGrid(<NotFound/>);
            })
    }, [pathname, productReq, pageNumber, searchFrag, productBrand, productType, sortFilter, setPageCount, setPageNumber, checkHomePageToggle]);

    return <>{isLoading ? <ProductGridSkeleton skeletonItems={productReq.pageSize}/> : productGridItems}</>
}

export const ProductGridItems = withRouter(ProductGrid);