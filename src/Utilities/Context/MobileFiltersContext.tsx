import * as React from "react";

export const MobileFiltersContext = React.createContext({
        isFilterSelected: false,
        toggleFilterSelection: (func: (prevState: boolean) => boolean) => {}
    }
);

export const MobileFiltersContextProvider: React.FunctionComponent = props => {
    const [isFilterSelected, toggleFilterSelection] = React.useState(false);

    return (
        <MobileFiltersContext.Provider value={{
            isFilterSelected,
            toggleFilterSelection
        }}>
            {props.children}
        </MobileFiltersContext.Provider>
    )
}