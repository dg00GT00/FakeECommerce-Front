import * as React from "react";
import {Route} from "react-router-dom";
import {ProductModal} from "../../ProductManagerSection/ProductsSection/ProductModal/ProductModal";

export const ProductModalRouteManager : React.FunctionComponent = () => {
    return (
        <Route path={"/products"} render={({location: {search}}) => {
            if (search.includes("id")) {
                const params = new URLSearchParams(search);
                return <ProductModal id={+(params.get("id") ?? "0")} key={new Date().getTime()}/>;
            }
        }}/>
    );
}