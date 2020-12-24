import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ProductManagerSection} from "../ProductManagerSection/ProductManagerSection";
import {UserManagerSection} from "../UserManagerSection/UserManagerSection";
import {AuthContextProvider} from "../Utilities/Context/AuthContext";


export const GlobalRouteManager: React.FunctionComponent = () => {
    return (
        <Switch>
            <AuthContextProvider>
                <Route exact path={["/", "/products"]}>
                    <ProductManagerSection/>
                </Route>
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