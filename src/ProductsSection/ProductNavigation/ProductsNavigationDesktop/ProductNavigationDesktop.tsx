import * as React from "react";
import {TypeProductOptions} from "./ProductsNavOptions/TypeProductOptions";
import {BrandProductOptions} from "./ProductsNavOptions/BrandProductOptions";
import {SortProductOptions} from "./ProductsNavOptions/SortProductOptions";
import {SearchProducts} from "./ProductsNavOptions/SearchProducts";
import styles from "./ProductNavigationDesktop.module.scss";


export const ProductNavigationDesktop: React.FunctionComponent = () => {
    return (
        <div className={styles.filter_options}>
            {/*TODO: Refactor the following components in order to eliminate code repetition*/}
            {/*TODO: Implement a media query to cellular phone for leading with position of filter options*/}
            {/*TODO: Maybe implement a dedicated button to show the filter options when in mobile version*/}
            <TypeProductOptions className={styles.product_type}/>
            <BrandProductOptions className={styles.product_brand}/>
            <SortProductOptions className={styles.product_sort}/>
            <SearchProducts className={styles.product_search}/>
        </div>
    )
}