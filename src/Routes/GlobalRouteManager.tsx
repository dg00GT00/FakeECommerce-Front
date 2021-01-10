import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ProductManagerSection} from "../ProductManagerSection/ProductManagerSection";
import {UserManagerSection} from "../UserManagerSection/UserManagerSection";
import {AuthContextProvider} from "../Utilities/Context/AuthContext";
import {CheckoutRoot} from "../CheckoutManagerSection/Checkout/CheckoutRoot";
import {CartContextProvider} from "../Utilities/Context/CartContext";


export const GlobalRouteManager: React.FunctionComponent = () => {
    return (
        <Switch>
            <AuthContextProvider>
                <CartContextProvider>
                    <Route exact path={["/", "/products"]}>
                        <ProductManagerSection/>
                    </Route>
                    <Route path={"/checkout"}>
                        <CheckoutRoot/>
                    </Route>
                </CartContextProvider>
                <Route path={"/user"}>
                    <UserManagerSection/>
                </Route>
                {/*<Route>*/}
                {/*    <NotFound/>*/}
                {/*</Route>*/}
            </AuthContextProvider>
        </Switch>
    )
}