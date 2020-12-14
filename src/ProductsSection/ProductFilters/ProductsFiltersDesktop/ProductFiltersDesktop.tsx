import * as React from "react";
import {TypeFilterOptions} from "./ProductsFiltersOptions/TypeFilterOptions";
import {BrandProductFilter} from "./ProductsFiltersOptions/BrandProductFilter";
import {SortFilterOptions} from "./ProductsFiltersOptions/SortFilterOptions";
import {SearchFilter} from "./ProductsFiltersOptions/SearchFilter";
import styles from "./ProductFiltersDesktop.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {ClearButton} from "../../../Utilities/ClearFilterManager/ClearButton";
import {ProductFilterDesktop} from "../ProductFilterTypes";


const useStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark
        }
    })
})

export const ProductFiltersDesktop: React.FunctionComponent<ProductFilterDesktop> = props => {
    const style = useStyle();

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filter_options}>
                {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                <TypeFilterOptions className={styles.product_type} setClearFunction={props.setClearFunction}/>
                <BrandProductFilter className={styles.product_brand} setClearFunction={props.setClearFunction}/>
                <SortFilterOptions className={styles.product_sort} setClearFunction={props.setClearFunction}/>
                <SearchFilter className={styles.product_search} setClearFunction={props.setClearFunction}/>
            </div>
            <ClearButton className={[styles.clear, style.root].join(" ")}/>
        </div>
    );
}
