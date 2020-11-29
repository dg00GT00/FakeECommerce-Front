import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductNavOptions} from "./ProductsNavOptions/ProductNavOptions";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles()
    const productGridItems = Array.from(Array(12), (_, index) => <ProductCard key={index}/>)

    return (
        <>
            <LandingMarketing color={"secondary"}>
                <p>Take a look in our <span className={styles.fakeness}>Fakeness</span></p>
            </LandingMarketing>
            <div className={[style.root, styles.grid_container].join(' ')}>
                <ProductNavOptions/>
                <div className={styles.grid_content}>
                    {productGridItems}
                </div>
            </div>
        </>
    )
}