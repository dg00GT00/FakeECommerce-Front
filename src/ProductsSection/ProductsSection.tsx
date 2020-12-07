import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductNavigation} from "./ProductNavigation/ProductNavigation";
import {CartContext} from "../Cart/CartContext";
import {FloatingCart} from "../Cart/FloatingCart";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles();
    const productContext = React.useContext(CartContext);
    const [_, setCartStyle] = React.useState({});

    const productGridItems = Array.from(Array(12), (_, index) => <ProductCard key={index}/>)
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
    }, [productContext.amount])

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
                    {floatingCart.current}
                </div>
            </div>
        </section>
    )
}