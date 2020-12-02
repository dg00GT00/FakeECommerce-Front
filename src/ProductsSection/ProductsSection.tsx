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
        <section>
            <LandingMarketing color={"secondary"}>
                Take a look in our <span className={styles.fakeness}>Fakeness</span>
            </LandingMarketing>
            <div className={[style.root, styles.grid_background].join(' ')}>
                <div className={styles.grid_container}>
                    <div className={styles.filter_options}>
                        {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                        {/*TODO: Implement a media query to cellular phone for leading with position of filter options*/}
                        {/*TODO: Maybe implement a dedicated button to show the filter options when in mobile version*/}
                        <TypeProductOptions className={styles.product_type}/>
                        <BrandProductOptions className={styles.product_brand}/>
                        <SortProductOptions className={styles.product_sort}/>
                        <SearchProducts className={styles.product_search}/>
                    </div>
                    <div className={styles.grid_content}>
                        {productGridItems}
                    </div>
                </div>
            </div>
        </section>
    )
}