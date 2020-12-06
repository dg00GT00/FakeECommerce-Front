import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductNavigation} from "./ProductNavigation/ProductNavigation";
import {FloatingCard} from "../Cart/FloatingCart";
import {CartContext} from "../Cart/CartContext";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles()
    const productContext = React.useContext(CartContext);

    const productGridItems = Array.from(Array(12), (_, index) => <ProductCard key={index}/>)
    const floatingCard = productContext.amount > 0 ? <FloatingCard/> : null


    return (
        <section>
            <LandingMarketing color={"secondary"}>
                Take a look in our <span className={styles.fakeness}>Fakeness</span>
            </LandingMarketing>
            <div className={[style.root, styles.grid_background].join(' ')}>
                <div className={styles.grid_container}>
                    <ProductNavigation/>
                    <div className={styles.grid_content}>
                        {productGridItems}
                    </div>
                </div>
                <div className={styles.floating_cart}>
                    {floatingCard}
                </div>
            </div>
        </section>
    )
}