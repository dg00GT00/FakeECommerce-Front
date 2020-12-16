import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {useTheme} from "@material-ui/core";

const filterIndicatorStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    marginLeft: "15px",
    backgroundColor: "initial"
};

const filterIndicator: {[i: string]: number} = {};

export const SortFilterOptions: React.FunctionComponent<{ onClose: React.MouseEventHandler }> = props => {
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Sort, ProductFilterState.FilterSort);
    const filterRef = React.useRef<HTMLLIElement | null>(null);

    const theme = useTheme();

    const sortItems = [
        "Alphabetically",
        "Reverse",
        "Lower Price",
        "Higher Price"
    ].map((value, index) => {
        const id = `sort_${index}`;
        filterIndicator[id] = index;
        return (
            <MenuItem ref={filterRef} key={id} onClick={event => handleClick(event, index)}
                      style={{justifyContent: "space-between"}}>
                {value}
                <div style={filterIndicatorStyle} id={id}/>
            </MenuItem>
        )
    });

    const handleClick = (event: React.MouseEvent, index: number) => {
        const id = `sort_${index}`;
        const textContent = event.currentTarget.textContent;
        const value = textContent === "Reverse" ? "Reverse Alphabetically" : textContent;
        const filterById = document.getElementById(id);
        for (const indicatorId in filterIndicator) {
            if (filterById) {
                if (indicatorId === id) {
                    console.log(indicatorId);
                    filterById.style.backgroundColor = theme.palette.primary.main;
                } else {
                    filterById.style.backgroundColor = "initial";
                }
            }
        }
        pushToRoute(value?.toLowerCase());
        props.onClose(event);
    }

    return (
        <>
            <ListSubheader>Sort by</ListSubheader>
            {sortItems}
        </>
    );
}
