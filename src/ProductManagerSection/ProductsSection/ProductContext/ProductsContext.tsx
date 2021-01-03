import * as React from "react";
import {ProductRequestManager} from "../../../HttpRequests/ProductRequestManager";

const productRequest = new ProductRequestManager(12);

export const ProductsContext = React.createContext({
    productReq: productRequest,
    pageCount: 0,
    pageNumber: 0,
    isHomePage: false,
    checkHomePageToggle: (isHomePage: boolean) => {},
    setPageNumber: (pageNumber: number) => {
    },
    setPageCount: (pageCount: number) => {
    }
});

export const ProductsContextProvider: React.FunctionComponent = props => {
    const [pageCount, setPageCount] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [isHomePage, checkHomePageToggle] = React.useState(false);

    return (
        <ProductsContext.Provider
            value={{
                productReq: productRequest,
                isHomePage,
                checkHomePageToggle,
                pageCount,
                setPageCount,
                pageNumber,
                setPageNumber
            }}>
            {props.children}
        </ProductsContext.Provider>
    )
}