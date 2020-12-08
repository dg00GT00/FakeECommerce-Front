import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductNavigation} from "./ProductNavigation/ProductNavigation";
import {CartContext} from "../Cart/CartContext";
import {FloatingCart} from "../Cart/FloatingCart";
import {ProductPagination} from "./ProductPagination/ProductPagination";
import {Route} from "react-router-dom";
import {ProductGrid} from "./ProductGrid/ProductGrid";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles();
    const productContext = React.useContext(CartContext);
    const setCartStyle = React.useState({})[1];

    const floatingCart = React.useRef<JSX.Element | null>(null);

    React.useEffect(() => {
        const cartStyle = {
            position: "sticky",
            top: document.documentElement.clientHeight / 2
        }
        setCartStyle(prevState => {
            if (productContext.amount > 0) {
                setCartStyle(_ => {
                    floatingCart.current = <FloatingCart style={cartStyle}/>;
                    return cartStyle;
                });
            }
            if (productContext.amount === 0) {
                setCartStyle(_ => {
                    floatingCart.current = null;
                    return {}
                });
            }
        })
    }, [setCartStyle, productContext.amount])

    return (
        <section>
            <LandingMarketing color={"secondary"}>
                Take a look in our <span className={styles.fakeness}>Fakeness</span>
            </LandingMarketing>
            <div className={[style.root, styles.grid_background].join(" ")}>
                <div className={styles.grid_container}>
                    <ProductNavigation/>
                    <div className={styles.grid_content}>
                        <Route path={"/products&page=:pageNumber"}>
                            <ProductGrid/>
                        </Route>
                    </div>
                </div>
                <div className={styles.floating_cart}>
                    {floatingCart.current}
                </div>
            </div>
            <div className={[styles.pagination, style.root].join(" ")}>
                <ProductPagination/>
            </div>
        </section>
    )
}