import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {HeaderMobile} from "./MobileVersion/HeaderMobile";
import {HeaderDesktop} from "./DesktopVersion/HeaderDesktop";
import {GeneralMediaQueries} from "../Utilities/Theme/GeneralMediaQueries";

const [login, signup] = ["Login", "Signup"]

export const Header: React.FunctionComponent = () => {
    const media = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`)
    return media ?
        <HeaderMobile login={login} signup={signup}/> :
        <HeaderDesktop login={login} signup={signup}/>;
}