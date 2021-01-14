import * as React from "react";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";

export const useCheckoutRoute = () => {
    const {push} = useHistory();
    const {getJwt} = useContext(AuthContext);

    return (event: React.MouseEvent) => {
        if (!getJwt()) {
            push({
                pathname: "/user/login"
            });
            return;
        }

        push({
            pathname: "/checkout"
        });
    }
}