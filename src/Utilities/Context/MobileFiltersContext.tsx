import * as React from "react";

export const MobileFiltersContext = React.createContext({
    isFilterSelected: false,
    setSelection: () => {
    },
    resetSelection: () => {
    }
});

export const MobileFiltersContextProvider: React.FunctionComponent = props => {
    const [isFilterSelected, toggleFilterSelection] = React.useState(false);

    return (
        <MobileFiltersContext.Provider value={{
            isFilterSelected,
            setSelection: () => toggleFilterSelection(true),
            resetSelection: () => toggleFilterSelection(false)
        }}>
            {props.children}
        </MobileFiltersContext.Provider>
    )
}