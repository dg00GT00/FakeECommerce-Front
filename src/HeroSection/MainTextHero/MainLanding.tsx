import Button from "@material-ui/core/Button/Button";
import * as React from "react";
import {LandingImages} from "../LandingImages/LandingImages";
import styles from "./MainLanding.module.scss";
import {handleScrollGridItems} from "../../Utilities/ProductGridScroll";


export const MainLanding: React.FunctionComponent = () => {

    return (
        <LandingImages>
            <div className={styles.call}>
                <p className={styles.main_call}>Buy fake products with us</p>
                <p className={styles.sub_call}>Here, the products are fake but your money is taken seriously</p>
                <Button
                    onClick={handleScrollGridItems}
                    className={styles.call_action}
                    variant={"contained"}
                    color={"secondary"}>start shopping</Button>
            </div>
        </LandingImages>
    )
}