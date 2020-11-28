import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";

export const ProductsSection: React.FunctionComponent = () => {
    return (
        <LandingMarketing color={"secondary"}>
            <p>Take a look in our <span className={styles.fakeness}>Fakeness</span></p>
        </LandingMarketing>
    )
}