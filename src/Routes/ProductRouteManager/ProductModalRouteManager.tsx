import * as React from "react";
import {Route} from "react-router-dom";
import {ProductModal} from "../../ProductManagerSection/ProductsSection/ProductModal/ProductModal";

// TODO: Make this route keep the product grid route information when the user
// TODO: access it by url 
export const ProductModalRouteManager: React.FunctionComponent = () => {
	return (
		<Route
			path={"/products"}
			render={({ location: { search } }) => {
				if (search.includes("id")) {
					const params = new URLSearchParams(search);
					return (
						<ProductModal
							id={+(params.get("id") ?? "0")}
							modalKey={new Date().getTime()}
						/>
					);
				}
			}}
		/>
	);
};