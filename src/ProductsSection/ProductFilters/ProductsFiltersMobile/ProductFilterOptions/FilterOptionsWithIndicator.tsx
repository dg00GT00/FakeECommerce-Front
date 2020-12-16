import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {FilterOptions, ProductFilterState} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {useTheme} from "@material-ui/core";
import {ClearFiltersContext} from "../../../../Utilities/ClearFilterManager/ClearFiltersContext";

const filterIndicatorStyle = {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    marginLeft: "15px",
    backgroundColor: "initial"
};

type FilterOptionsWithIndicatorProps = {
    clickAction: React.MouseEventHandler,
    filterOptions: string[],
    filterType: FilterOptions,
    subHeader?: string,
    optionsId?: string[]
};

export const FilterOptionsWithIndicator: React.FunctionComponent<FilterOptionsWithIndicatorProps> = props => {

    if (props.optionsId && props.optionsId.length !== props.filterOptions.length) {
        throw new Error("The number of items in the optionsId props must match the number of items of filterOptions props");
    }

    const {clearSwitch} = React.useContext(ClearFiltersContext);
    const pushToRoute = useProductFilterRoute(FilterOptions.Sort, ProductFilterState.FilterSort);
    const [indicatorStyle, setIndicatorStyle] = React.useState<{ [i: string]: { [i: string]: string } }>({});
    const filterRef = React.useRef<HTMLLIElement | null>(null);

    const theme = useTheme();

    const filterItems = props.filterOptions.map((value, index) => {
        const id = `${props.filterType}_${index}`;
        indicatorStyle[id] = filterIndicatorStyle;
        return (
            <MenuItem ref={filterRef}
                      key={id}
                      id={props.optionsId ? props.optionsId[index] : undefined}
                      onClick={event => handleClick(event, index)}
                      style={{justifyContent: "space-between"}}>
                {value}
                <div style={filterIndicatorStyle} id={id}/>
            </MenuItem>
        )
    });

    const handleClick = (event: React.MouseEvent, index: number) => {
        const textContent = event.currentTarget.textContent;
        setIndicatorStyle(prevIndicator => {
            const id = `${props.filterType}_${index}`;
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
        pushToRoute(textContent?.toLowerCase());
        props.clickAction(event);
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
            {props.subHeader ? <ListSubheader>{props.subHeader}</ListSubheader> : null}
            {filterItems}
        </>
    );
}
