import * as React from "react";
import {useProductFilterRoute} from "../CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../ProductModels/ProductFiltersEnum";

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
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Clear, ProductFilterState.Clear)

    const setClearFunction = (clearProps: ClearFilterType) => {
        clearPropsArray.push(clearProps);
    }

    const setClear = () => {
        clearPropsArray?.forEach(clearProp => {
            clearProp.clearInputFunction("");
            clearProp.clearFilterFromParams();
        });
        pushToRoute();
    }

    return (
        <ClearFiltersContext.Provider value={{setClear, setClearFunction}}>
            {props.children}
        </ClearFiltersContext.Provider>
    );
}