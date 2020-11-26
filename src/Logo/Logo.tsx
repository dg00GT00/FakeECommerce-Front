import * as React from "react";
import {ReactComponent as ELogo} from "../Assets/eCommerceLogo.svg";
import style from "./Logo.module.scss"

export const Logo: React.FunctionComponent = props => {
    return (
        <div className={style.full_logo}>
            <ELogo className={style.logo_symbol}/>
            <p>Fake <span>Commerce</span></p>
        </div>
    )
}