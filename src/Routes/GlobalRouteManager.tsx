import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { ProductManagerSection } from "../ProductManagerSection/ProductManagerSection";
import { UserManagerSection } from "../UserManagerSection/UserManagerSection";
import { AuthContextProvider } from "../Utilities/Context/AuthContext";
import { CartContextProvider } from "../Utilities/Context/CartContext";
import { CheckoutManagerSection } from "../CheckoutManagerSection/CheckoutManagerSection";
import { NotFound } from "../Utilities/RouterValidation/NotFound";

export const GlobalRouteManager: React.FunctionComponent = () => {
	return (
		<AuthContextProvider>
			<CartContextProvider>
				<Route exact path={["/", "/products"]}>
					<ProductManagerSection />
				</Route>
				<Route path={"/checkout"}>
					<CheckoutManagerSection />
				</Route>
			</CartContextProvider>
			<Route path={"/user"}>
				<UserManagerSection />
			</Route>
            <Route>
                <NotFound/>
            </Route>
		</AuthContextProvider>
	);
};
