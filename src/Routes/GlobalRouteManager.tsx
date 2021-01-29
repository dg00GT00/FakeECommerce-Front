import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {ProductManagerSection} from "../ProductManagerSection/ProductManagerSection";
import {UserManagerSection} from "../UserManagerSection/UserManagerSection";
import {AuthContextProvider} from "../Utilities/Context/AuthContext";
import {CartContextProvider} from "../Utilities/Context/CartContext";
import {CheckoutManagerSection} from "../CheckoutManagerSection/CheckoutManagerSection";
import {NotFound} from "../Utilities/RouterValidation/NotFound";
import {OrderContextProvider} from "../Utilities/Context/OrderContext";

/* 
* The "Not Found" should be rendered separately for each application section manager
* A global "Not Found" fallback page must filter the top-level path names routes in order to
* prevent its render in each route request
*
* Hope that better solution came up with "React Route V6" release
 */
export const GlobalRouteManager: React.FunctionComponent = () => {
	return (
		<AuthContextProvider>
			<CartContextProvider>
				<OrderContextProvider>
					<Route exact path={["/", "/products"]}>
						<ProductManagerSection/>
					</Route>
					<Switch>
						<Route path={"/checkout"}>
							<CheckoutManagerSection/>
						</Route>
						<Route path={"/user"}>
							<UserManagerSection/>
						</Route>
						<Route
							render={({location: {pathname}}) => {
								for (const path of ["/", "/products", "/checkout", "/user"]) {
									if (pathname === path) {
										return null;
									}
								}
								return <NotFound/>;
							}}
						/>
					</Switch>
				</OrderContextProvider>
			</CartContextProvider>
		</AuthContextProvider>
	);
};
