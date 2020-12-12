import * as React from "react";
import {TypeProductOptions} from "./ProductsNavOptions/TypeProductOptions";
import {BrandProductOptions} from "./ProductsNavOptions/BrandProductOptions";
import {SortProductOptions} from "./ProductsNavOptions/SortProductOptions";
import {SearchProducts} from "./ProductsNavOptions/SearchProducts";
import styles from "./ProductNavigationDesktop.module.scss";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";


const useStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.light
        }
    })
})

export const ProductNavigationDesktop: React.FunctionComponent = () => {
    const history = useHistory();
    const style = useStyle();

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filter_options}>
                {/*TODO: Refactor the following components in order to eliminate code repetition*/}
                {/*TODO: Implement a media query to cellular phone for leading with position of filter options*/}
                {/*TODO: Maybe implement a dedicated button to show the filter options when in mobile version*/}
                <TypeProductOptions className={styles.product_type}/>
                <BrandProductOptions className={styles.product_brand}/>
                <SortProductOptions className={styles.product_sort}/>
                <SearchProducts className={styles.product_search}/>
            </div>
            <Button color={"primary"} variant={"contained"} className={[styles.clear, style.root].join(" ")}
                    onClick={() => history.push("/clear")}>Clear</Button>
        </div>
    )
}
