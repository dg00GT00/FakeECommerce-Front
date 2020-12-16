import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {useTheme} from "@material-ui/core";
import {ClearFiltersContext} from "../../../../Utilities/ClearFilterManager/ClearFiltersContext";

const filterIndicatorStyle = {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    marginLeft: "15px",
    backgroundColor: "initial"
};

const filterIndicator: { [i: string]: { [i: string]: string } } = {};

export const SortFilterOptions: React.FunctionComponent<{ onClose: React.MouseEventHandler }> = props => {
    const {clearSwitch} = React.useContext(ClearFiltersContext);
    const pushToRoute = useProductFilterRoute(UrlQueryFilter.Sort, ProductFilterState.FilterSort);
    const [indicatorStyle, setIndicatorStyle] = React.useState(filterIndicator);
    const filterRef = React.useRef<HTMLLIElement | null>(null);

    const theme = useTheme();

    const sortItems = [
        "Alphabetically",
        "Reverse",
        "Lower Price",
        "Higher Price"
    ].map((value, index) => {
        const id = `sort_${index}`;
        filterIndicator[id] = filterIndicatorStyle;
        return (
            <MenuItem ref={filterRef} key={id} onClick={event => handleClick(event, index)}
                      style={{justifyContent: "space-between"}}>
                {value}
                <div style={filterIndicatorStyle} id={id}/>
            </MenuItem>
        )
    });

    const handleClick = (event: React.MouseEvent, index: number) => {
        const textContent = event.currentTarget.textContent;
        const value = textContent === "Reverse" ? "Reverse Alphabetically" : textContent;
        setIndicatorStyle(prevIndicator => {
            const id = `sort_${index}`;
            const indicator = prevIndicator || indicatorStyle;
            for (const indicatorId in indicator) {
                const indicatorEl = document.getElementById(indicatorId);
                if (indicatorId === id) {
                    indicator[indicatorId] = {...indicator[indicatorId], backgroundColor: theme.palette.primary.main};
                    if (indicatorEl) {
                        indicatorEl.style.backgroundColor = indicator[indicatorId].backgroundColor;
                    }
                } else {
                    indicator[indicatorId] = {...indicator[indicatorId], backgroundColor: "initial"};
                    if (indicatorEl) {
                        indicatorEl.style.backgroundColor = indicator[indicatorId].backgroundColor;
                    }
                }
            }
            return indicator;
        })
        pushToRoute(value?.toLowerCase());
        props.onClose(event);
    }

    React.useEffect(() => {
        setIndicatorStyle(prevIndicator => {
            const indicator = prevIndicator || indicatorStyle;
            for (const indicatorId in indicator) {
                const indicatorEl = document.getElementById(indicatorId);
                indicator[indicatorId] = {...indicator[indicatorId], backgroundColor: "initial"};
                if (indicatorEl) {
                    indicatorEl.style.backgroundColor = indicator[indicatorId].backgroundColor;
                }
            }
            return indicator;
        })
    }, [clearSwitch, indicatorStyle]);

    return (
        <>
            <ListSubheader>Sort by</ListSubheader>
            {sortItems}
        </>
    );
}
