import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";


export const SortFilterOptions: React.FunctionComponent<{ onClose: () => void }> = props => {
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Sort, ProductFilterState.FilterSort);

    const handleClick: React.MouseEventHandler = event => {
        props.onClose();
        pushToRoute(event.currentTarget.textContent?.toLowerCase());
    }

    return (
        <>
            <ListSubheader>Sort by</ListSubheader>
            {["Alphabetically", "Reverse", "Lower Price", "Higher Price"].map(value => {
                value = value === "Reverse" ? "Reverse Alphabetically" : value;
                return <MenuItem onClick={handleClick}>{value}</MenuItem>;
            })}
        </>
    );
}
