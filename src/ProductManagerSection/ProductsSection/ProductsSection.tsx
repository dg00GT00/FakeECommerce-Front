import * as React from "react";
import {LandingMarketing} from "../../StructureSection/LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {CartContext} from "../../Utilities/Context/CartContext";
import {FloatingCart} from "../Cart/FloatingCart";
import {ProductPaginationManager} from "./ProductPaginationManager/ProductPaginationManager";
import {ProductsContextProvider} from "./ProductContext/ProductsContext";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}));

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
    }, [setCartStyle, productContext.amount]);

    return (
        <section>
            <LandingMarketing color={"secondary"}>
                Take a look in our <span className={styles.fakeness}>Fakeness</span>
            </LandingMarketing>
            <ProductsContextProvider>
                <div className={[style.root, styles.grid_background].join(" ")}>
                    <ProductPaginationManager/>
                    <div className={styles.floating_cart}>
                        {floatingCart.current}
                    </div>
                </div>
            </ProductsContextProvider>
        </section>
    );
}