import * as React from "react";
import {ProductRequestManager} from "../../HttpRequests/ProductsRequests";

const productRequest = new ProductRequestManager(12);

export const ProductsContext = React.createContext({
    productReq: productRequest,
    pageCount: 0,
    pageNumber: 0,
    setPageNumber: (pageNumber: number) => {
    },
    setPageCount: (pageCount: number) => {
    }
});

export const ProductsContextProvider: React.FunctionComponent = props => {
    const [pageCount, setPageCount] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(0);

    return (
        <ProductsContext.Provider
            value={{
                productReq: productRequest,
                pageCount,
                setPageCount,
                pageNumber,
                setPageNumber
            }}>
            {props.children}
        </ProductsContext.Provider>
    )
}