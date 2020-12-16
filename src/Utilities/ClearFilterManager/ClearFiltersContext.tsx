import * as React from "react";
import {useProductFilterRoute} from "../CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../ProductModels/ProductFiltersEnum";

export type ClearFilterType = {
    clearInputFunction: React.Dispatch<React.SetStateAction<string | number>>,
    clearFilterFromParams: () => void
}

export const ClearFiltersContext = React.createContext({
    clearSwitch: 0,
    setClear: () => {
    },
    setClearFunction: (clearProps: ClearFilterType) => {
    }
});

const clearPropsArray: ClearFilterType[] = [];

export const ClearFiltersProvider: React.FunctionComponent = props => {
    const [clearSwitch, toggleClearSwitch] = React.useState(0);
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Clear, ProductFilterState.Clear)

    const setClearFunction = (clearProps: ClearFilterType) => {
        clearPropsArray.push(clearProps);
    }

    const setClear = () => {
        toggleClearSwitch(_ => {
            if (clearSwitch === 0) {
                return 1;
            } else {
                return 0;
            }
        });
        clearPropsArray?.forEach(clearProp => {
            clearProp.clearInputFunction("");
            clearProp.clearFilterFromParams();
        });
        pushToRoute();
    }

    return (
        <ClearFiltersContext.Provider value={{setClear, setClearFunction, clearSwitch}}>
            {props.children}
        </ClearFiltersContext.Provider>
    );
}