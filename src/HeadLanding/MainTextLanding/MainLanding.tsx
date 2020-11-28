import * as React from "react";
import {LandingImages} from "../LandingImages/LandingImages";
import styles from "./MainLanding.module.scss"


export const MainLanding: React.FunctionComponent = () => {
    return (
        <LandingImages>
            <div className={styles.call}>
                <p className={styles.main_call}>Buy fake products with us</p>
                <p className={styles.sub_call}>Here, the products are fake but your money is taken seriously</p>
                <button className={styles.call_action}>start shopping</button>
            </div>
        </LandingImages>
    )
}