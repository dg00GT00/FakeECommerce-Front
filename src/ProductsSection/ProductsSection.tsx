import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductNavigation} from "./ProductNavigation/ProductNavigation";
import {CartContext} from "../Cart/CartContext";
import {FloatingCart} from "../Cart/FloatingCart";
import {ProductPagination} from "./ProductPagination/ProductPagination";
import {ProductApi} from "../HttpRequests/AxiosInstance";
import {FullProductType} from "../Utilities/ProductDtos/FullProductDto";
import {ProductCardMapper} from "../Utilities/Mappers/ProductCardMapper";

const useStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}))

export const ProductsSection: React.FunctionComponent = () => {
    const style = useStyles();
    const productContext = React.useContext(CartContext);
    const [_, setCartStyle] = React.useState({});
    const [productGridItems, setProductGrid] = React.useState<JSX.Element[] | null>(null);

    const floatingCart = React.useRef<JSX.Element | null>(null);

    React.useEffect(() => {
        ProductApi
            .get<FullProductType>("/Products?PageSize=12")
            .then(product => {
                const productGridItems = ProductCardMapper(product.data)
                    .map(product => {
                        const {name, description, pictureUrl, price} = product
                        return <ProductCard
                            name={name}
                            description={description}
                            pictureUrl={pictureUrl}
                            price={price}/>
                    })
                setProductGrid(productGridItems);
            })
    }, [])

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
            <div className={[styles.pagination, style.root].join(" ")}>
                <ProductPagination/>
            </div>
        </section>
    )
}