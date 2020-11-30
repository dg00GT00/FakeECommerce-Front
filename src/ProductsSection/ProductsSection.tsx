import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {SortProductOptions} from "./ProductsNavOptions/SortProductOptions";
import {TypeProductOptions} from "./ProductsNavOptions/TypeProductOptions";
import {BrandProductOptions} from "./ProductsNavOptions/BrandProductOptions";
import {SearchProducts} from "./ProductsNavOptions/SearchProducts";

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
                <div className={styles.filter_options}>
                    {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                    <TypeProductOptions className={styles.product_type}/>
                    <BrandProductOptions className={styles.product_brand}/>
                    <SortProductOptions className={styles.product_sort}/>
                    <SearchProducts className={styles.product_search}/>
                </div>
                <div className={styles.grid_content}>
                    {productGridItems}
                </div>
            </div>
        </>
    )
}