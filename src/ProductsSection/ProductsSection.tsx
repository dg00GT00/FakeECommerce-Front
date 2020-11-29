import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles()

    return (
        <>
            <LandingMarketing color={"secondary"}>
                <p>Take a look in our <span className={styles.fakeness}>Fakeness</span></p>
            </LandingMarketing>
            <div className={[style.root, styles.container].join(' ')}>
                <ProductCard/>
            </div>
        </>
    )
}