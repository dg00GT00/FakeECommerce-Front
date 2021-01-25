import * as React from "react";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {CheckoutRoute} from "./CheckoutRoute";

export const useCheckoutRoute = () => {
    const {push} = useHistory();
    const {jwtManager: {jwt}} = useContext(AuthContext);

    return (event: React.MouseEvent) => {
        if (!jwt) {
            push({
                pathname: "/user/login",
                state: CheckoutRoute.TO_LOGIN
            });
            return;
        }

        push({
            pathname: "/checkout/shipping"
        });
    }
}