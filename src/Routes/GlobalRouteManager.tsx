import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ProductManagerSection} from "../ProductManagerSection/ProductManagerSection";
import {UserRouteManager} from "./UserRouteManager/UserRouteManager";
import {NotFound} from "../Utilities/RouterValidation/NotFound";


export const GlobalRouteManager: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path={["/", "/products"]}>
                <ProductManagerSection/>
            </Route>
            <Route path={"/user"}>
                <UserRouteManager/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}