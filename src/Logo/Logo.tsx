import * as React from "react";
import {ReactComponent as ELogo} from "../Assets/eCommerceBaseLogo.svg";
import style from "./Logo.module.scss"

export const Logo: React.FunctionComponent = props => {
    return (
        <ELogo className={style.logo}/>
    )
}