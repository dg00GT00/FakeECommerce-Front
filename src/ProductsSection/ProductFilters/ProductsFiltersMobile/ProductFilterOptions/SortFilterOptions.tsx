import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";


export const SortFilterOptions: React.FunctionComponent = () => {
    const [sort, setSort] = React.useState<string | number>("");
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Sort, ProductFilterState.FilterSort, setSort);

    const handleClick: React.MouseEventHandler = event => {
        console.log(event.currentTarget);
    }

    return (
        <>
            <ListSubheader>Sort by</ListSubheader>
            <MenuItem>Alphabetically</MenuItem>
            <MenuItem>Reverse Alphabetically</MenuItem>
            <MenuItem>Lower Price</MenuItem>
            <MenuItem onClick={handleClick}>Higher Price</MenuItem>
        </>
    );
}
