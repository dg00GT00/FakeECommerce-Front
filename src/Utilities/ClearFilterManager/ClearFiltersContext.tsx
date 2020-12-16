import * as React from "react";
import {useProductFilterRoute} from "../CustomHooks/useProductFilterRoute";
import {FilterOptions, ProductFilterState} from "../ProductModels/ProductFiltersEnum";

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
    const clearSwitch = React.useRef(0);
    const pushToRoute = useProductFilterRoute(FilterOptions.Clear, ProductFilterState.Clear)

    const setClearFunction = (clearProps: ClearFilterType) => {
        clearPropsArray.push(clearProps);
    }

    const setClear = () => {
        if (clearSwitch.current === 0) {
            clearSwitch.current = 1;
        } else {
            clearSwitch.current = 0;
        }
        clearPropsArray?.forEach(clearProp => {
            clearProp.clearInputFunction("");
            clearProp.clearFilterFromParams();
        });
        pushToRoute();
    }

    return (
        <ClearFiltersContext.Provider value={{setClear, setClearFunction, clearSwitch: clearSwitch.current}}>
            {props.children}
        </ClearFiltersContext.Provider>
    );
}