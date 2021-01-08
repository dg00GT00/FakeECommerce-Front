import * as React from "react";
import {useHistory} from "react-router-dom";

export const useCheckoutRoute = () => {
    const {push} = useHistory();
    return (event: React.MouseEvent) => {
        push({
            pathname: "/checkout"
        });
    }
}