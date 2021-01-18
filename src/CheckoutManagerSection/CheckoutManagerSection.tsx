import * as React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Utilities/Context/AuthContext";
import { CheckoutRoute } from "../Utilities/CustomHooks/CheckoutRoute/CheckoutRoute";
import { CheckoutForms } from "./CheckoutForms/CheckoutForms";

export const CheckoutManagerSection: React.FunctionComponent = () => {
	const { getJwt } = React.useContext(AuthContext);

	return (
		<>
			{getJwt() ? (
				<CheckoutForms />
			) : (
				<Redirect
					to={{
						pathname: "/user/login",
						state: CheckoutRoute.TO_LOGIN,
					}}
				/>
			)}
		</>
	);
};
