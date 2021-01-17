import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { ProductManagerSection } from "../ProductManagerSection/ProductManagerSection";
import { UserManagerSection } from "../UserManagerSection/UserManagerSection";
import { AuthContextProvider } from "../Utilities/Context/AuthContext";
import { CheckoutRoot } from "../CheckoutManagerSection/Checkout/CheckoutRoot";
import { CartContextProvider } from "../Utilities/Context/CartContext";
import { NotFound } from "../Utilities/RouterValidation/NotFound";

export const GlobalRouteManager: React.FunctionComponent = () => {
	return (
		<AuthContextProvider>
			<CartContextProvider>
				<Route exact path={["/", "/products"]}>
					<ProductManagerSection />
				</Route>
				<Switch>
					<Route path={"/checkout"}>
						<CheckoutRoot />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</CartContextProvider>
			<Route path={"/user"}>
				<UserManagerSection />
			</Route>
		</AuthContextProvider>
	);
};
