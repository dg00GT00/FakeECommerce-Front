import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";
import {FloatingCartDesktop} from "./FloatingCartDesktop";

export const FloatingCart: React.FunctionComponent<{ style: { [i: string]: string | number } }> = props => {
    const media = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`)
    return media ? null : <FloatingCartDesktop style={props.style}/>
}