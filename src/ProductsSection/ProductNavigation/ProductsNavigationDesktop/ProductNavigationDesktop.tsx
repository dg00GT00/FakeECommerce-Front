import * as React from "react";
import {TypeProductOptions} from "./ProductsNavOptions/TypeProductOptions";
import {BrandProductOptions} from "./ProductsNavOptions/BrandProductOptions";
import {SortProductOptions} from "./ProductsNavOptions/SortProductOptions";
import {SearchProducts} from "./ProductsNavOptions/SearchProducts";
import styles from "./ProductNavigationDesktop.module.scss";
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {ClearFiltersContext} from "../ClearFiltersContext";


const useStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark
        }
    })
})

export const ProductNavigationDesktop: React.FunctionComponent = () => {
    const {clear, setClear} = React.useContext(ClearFiltersContext);
    const style = useStyle();

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filter_options}>
                {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                {/*TODO: Implement a media query to cellular phone for leading with position of filter options*/}
                {/*TODO: Maybe implement a dedicated button to show the filter options when in mobile version*/}
                <TypeProductOptions className={styles.product_type} clearFilter={clear}/>
                <BrandProductOptions className={styles.product_brand} clearFilter={clear}/>
                <SortProductOptions className={styles.product_sort} clearFilter={clear}/>
                <SearchProducts className={styles.product_search} clearFilter={clear}/>
            </div>
            <Button color={"primary"} variant={"contained"} className={[styles.clear, style.root].join(" ")}
                    onClick={setClear}>Clear</Button>
        </div>
    )
}
