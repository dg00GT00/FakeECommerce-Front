import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ProductManagerSection} from "../ProductManagerSection/ProductManagerSection";
import {NotFound} from "../Utilities/RouterValidation/NotFound";
import {UserManagerSection} from "../UserManagerSection/UserManagerSection";


export const GlobalRouteManager: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path={["/", "/products"]}>
                <ProductManagerSection/>
            </Route>
            <Route path={"/user"}>
                <UserManagerSection/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}