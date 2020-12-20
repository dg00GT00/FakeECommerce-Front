import * as React from "react";
import {useMediaQuery} from "@material-ui/core";
import {HeaderMobile} from "./MobileVersion/HeaderMobile";
import {HeaderDesktop} from "./DesktopVersion/HeaderDesktop";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";

export const Header: React.FunctionComponent = () => {
    const media = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`)
    return media ?
        <HeaderMobile loginPath={"/user/login"} signupPath={"/user/signup"}/> :
        <HeaderDesktop loginPath={"/user/login"} signupPath={"/user/signup"}/>;
}