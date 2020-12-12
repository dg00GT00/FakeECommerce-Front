import * as React from "react";
import {useHistory} from "react-router-dom";
import {ProductFilterEnum} from "../ProductRouteManager/ProductRouteManager";

export const ClearFiltersContext = React.createContext({
    clear: 0,
    setClear: () => {
    }
});

export const ClearFiltersProvider: React.FunctionComponent = props => {
    let [clear, setClear] = React.useState(0);
    const history = useHistory();

    const managerClear = () => {
        setClear(_ => {
            if (clear === 0) {
                clear = 1;
            } else {
                clear = 0;
            }
            return clear;
        })
        history.push({
            pathname: "/products",
            search: "clear",
            state: {
                filter: ProductFilterEnum.Clear
            }
        });
    }

    return (
        <ClearFiltersContext.Provider value={{clear, setClear: managerClear}}>
            {props.children}
        </ClearFiltersContext.Provider>
    );
}