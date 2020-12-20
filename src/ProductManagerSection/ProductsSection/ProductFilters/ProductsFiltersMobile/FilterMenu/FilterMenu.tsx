import * as React from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Badge from "@material-ui/core/Badge/Badge";
import {SvgIcon} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {MobileFiltersContext} from "../../../../../Utilities/Context/MobileFiltersContext";

const seeMoreStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fill: theme.palette.common.white,
        },
        button: {
            paddingRight: 0,
            paddingLeft: "5%"
        }
    })
})

const FilterIcon: React.FunctionComponent<{ className: string }> = props => {

    return (
        <SvgIcon className={props.className}>
            <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z"/>
            </svg>
        </SvgIcon>
    )
}

export const FilterMenu: React.FunctionComponent<{ onClick: React.MouseEventHandler }> = props => {
    const moreStyle = seeMoreStyle();
    const {isFilterSelected} = React.useContext(MobileFiltersContext);

    return (
        <Badge variant={"dot"} color={"secondary"} invisible={!isFilterSelected}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={props.onClick}>
                <FilterIcon className={moreStyle.root}/>
            </IconButton>
        </Badge>
    );
}