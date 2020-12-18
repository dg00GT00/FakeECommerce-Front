import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {FilterOptions, ProductFilterState} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {useTheme} from "@material-ui/core";
import {ClearFiltersContext} from "../../../../Utilities/Context/ClearFiltersContext";
import {MobileFiltersContext} from "../../../../Utilities/Context/MobileFiltersContext";

const filterIndicatorStyle = {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    marginLeft: "15px",
    backgroundColor: "initial"
};

type FilterOptionsWithIndicatorProps = {
    clickAction: (event: React.MouseEvent, index: number) => void,
    filterOptions: string[],
    filterType: FilterOptions,
    typeId: FilterOptions | string,
    filterState: ProductFilterState,
    noRequestThroughNavigation?: boolean,
    subHeader?: string,
    rootId?: string[]
};


export const FilterOptionsWithIndicator: React.FunctionComponent<FilterOptionsWithIndicatorProps> = props => {
    if (props.rootId && props.rootId.length !== props.filterOptions.length) {
        throw new Error("The number of items in the optionsId props must match the number of items of filterOptions props");

    }
    const {clearSwitch} = React.useContext(ClearFiltersContext);
    const {toggleFilterSelection} = React.useContext(MobileFiltersContext);
    const pushToRoute = useProductFilterRoute(props.filterType, props.filterState);
    const [indicatorStyle, setIndicatorStyle] = React.useState<{ [i: string]: { [i: string]: string } }>({});

    const theme = useTheme();

    const filterItems = props.filterOptions.map((value, index) => {
        const id = `${props.typeId}_${index}`;
        indicatorStyle[id] = filterIndicatorStyle;
        return (
            <MenuItem key={id}
                      id={props.rootId ? props.rootId[index] : undefined}
                      onClick={event => handleClick(event, index)}
                      style={{justifyContent: "space-between"}}>
                {value}
                <div style={filterIndicatorStyle} id={id}/>
            </MenuItem>
        )
    });

    const handleClick = (event: React.MouseEvent, index: number) => {
        const textContent = event.currentTarget.textContent;
        // This function should wrap the function that update the state of this component due to
        // asynchronous behavior of set state function
        toggleFilterSelection(_ => {
            setIndicatorStyle(prevIndicator => {
                const id = `${props.typeId}_${index}`;
                const indicator = prevIndicator || indicatorStyle;
                for (const indicatorId in indicator) {
                    const indicatorEl = document.getElementById(indicatorId);
                    if (indicatorId === id) {
                        indicator[indicatorId] = {
                            ...indicator[indicatorId],
                            backgroundColor: theme.palette.primary.main
                        };
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
            });
            return true;
        });
        if (!(props.noRequestThroughNavigation !== undefined && props.noRequestThroughNavigation)) {
            pushToRoute(textContent?.toLowerCase());
        }
        props.clickAction(event, index);
    }

    React.useEffect(() => {
        // This function should wrap the function that update the state of this component due to
        // asynchronous behavior of set state function
        toggleFilterSelection(_ => {
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
            });
            return false;
        })
    }, [clearSwitch, indicatorStyle, toggleFilterSelection]);

    return (
        <>
            {props.subHeader ? <ListSubheader>{props.subHeader}</ListSubheader> : null}
            {filterItems}
        </>
    );
}
