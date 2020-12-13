import * as React from "react";
import {TypeFilterOptions} from "./ProductsFiltersOptions/TypeFilterOptions";
import {BrandProductFilter} from "./ProductsFiltersOptions/BrandProductFilter";
import {SortFilterOptions} from "./ProductsFiltersOptions/SortFilterOptions";
import {SearchFilter} from "./ProductsFiltersOptions/SearchFilter";
import styles from "./ProductFiltersDesktop.module.scss";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {ClearFiltersContext} from "../../../Utilities/ClearFilterManager/ClearFiltersContext";
import {ClearButton} from "../../../Utilities/ClearFilterManager/ClearButton";


const useStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark
        }
    })
})

export const ProductFiltersDesktop: React.FunctionComponent = () => {
    const {clear} = React.useContext(ClearFiltersContext);
    const style = useStyle();

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filter_options}>
                {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                {/*TODO: Implement a media query to cellular phone for leading with position of filter options*/}
                {/*TODO: Maybe implement a dedicated button to show the filter options when in mobile version*/}
                <TypeFilterOptions className={styles.product_type} clearFilter={clear}/>
                <BrandProductFilter className={styles.product_brand} clearFilter={clear}/>
                <SortFilterOptions className={styles.product_sort} clearFilter={clear}/>
                <SearchFilter className={styles.product_search} clearFilter={clear}/>
            </div>
            <ClearButton className={[styles.clear, style.root].join(" ")}/>
        </div>
    );
}
