import * as React from "react";
import {useHistory} from "react-router-dom";
import {ProductFilterEnum} from "../Routes/ProductRouteManager/ProductRouteManager";

export type ClearFilterType = {
    clearInputFunction: React.Dispatch<React.SetStateAction<string | number>>,
    clearFilterFromParams: () => void
}

export const ClearFiltersContext = React.createContext({
    setClear: () => {
    },
    setClearFunction: (clearProps: ClearFilterType) => {
    }
});

const clearPropsArray: ClearFilterType[] = [];

export const ClearFiltersProvider: React.FunctionComponent = props => {
    const history = useHistory();

    const setClearFunction = (clearProps: ClearFilterType) => {
        clearPropsArray.push(clearProps);
    }

    const setClear = () => {
        clearPropsArray?.forEach(clearProp => {
            clearProp.clearInputFunction("");
            clearProp.clearFilterFromParams();
        });
        history.push({
            pathname: "/products",
            search: "clear",
            state: {filter: [ProductFilterEnum.Clear]}
        });
    }

    return (
        <ClearFiltersContext.Provider value={{setClear, setClearFunction}}>
            {props.children}
        </ClearFiltersContext.Provider>
    );
}