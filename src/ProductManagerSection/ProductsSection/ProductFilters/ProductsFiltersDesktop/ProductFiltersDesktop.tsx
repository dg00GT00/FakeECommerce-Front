import * as React from "react";
import {TypeFilterOptions} from "./ProductsFiltersOptions/TypeFilterOptions";
import {BrandProductFilter} from "./ProductsFiltersOptions/BrandProductFilter";
import {SortFilterOptions} from "./ProductsFiltersOptions/SortFilterOptions";
import {SearchFilter} from "./ProductsFiltersOptions/SearchFilter";
import styles from "./ProductFiltersDesktop.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {ClearButton} from "../../../../Utilities/ClearFilterManager/ClearButton";


const useStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark
        }
    })
})

export const ProductFiltersDesktop: React.FunctionComponent = () => {
    const style = useStyle();

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filter_options}>
                {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                <TypeFilterOptions className={styles.product_type}/>
                <BrandProductFilter className={styles.product_brand}/>
                <SortFilterOptions className={styles.product_sort}/>
                <SearchFilter className={styles.product_search}/>
            </div>
            <ClearButton className={[styles.clear, style.root].join(" ")}/>
        </div>
    );
}
