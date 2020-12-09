import * as React from "react";
import {ProductCard} from "../ProductCard/ProductCard";
import {ProductRouteValidation} from "../../Utilities/RouterValidation/ProductRouteValidation";
import styles from "../ProductPaginationManager/ProductPaginationManager.module.scss";
import {ProductNavigation} from "../ProductNavigation/ProductNavigation";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {NavLink, Route} from "react-router-dom";
import {ProductRequestManager} from "../../HttpRequests/ProductsRequests";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& svg": {
                fill: theme.palette.common.white
            },
            "& a": {
                color: theme.palette.common.white
            },
            "& .Mui-selected": {
                color: theme.palette.secondary.main,
                fontWeight: "bold"
            }
        },
    }),
);

const productReq = new ProductRequestManager();
const productsPerPage = 12;

export const ProductPaginationManager: React.FunctionComponent = () => {
    const style = useStyles();
    const [pageNumber, setPage] = React.useState(1);
    const [pageAmount, setPageAmount] = React.useState(1);
    const [isHomePageValidated, setHomePageValidation] = React.useState(true);
    const [productGridItems, setProductGrid] = React.useState<React.FunctionComponentElement<typeof ProductRouteValidation> | null>(null);

    React.useEffect(() => {
        productReq
            .getFullProductList(productsPerPage, pageNumber)
            .then(productList => {
                const productItems = productList?.map(product => {
                    return <ProductCard key={product.id} {...product}/>
                })
                setPageAmount(productReq.getProductPageAmount())
                setProductGrid(_ => {
                    return (
                        <ProductRouteValidation validateHome={isHomePageValidated} pageAmount={pageAmount}>
                            {productItems}
                        </ProductRouteValidation>
                    )
                });
            })
    }, [pageAmount, pageNumber, isHomePageValidated]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={styles.grid_container}>
            <ProductNavigation/>
            <div className={styles.grid_content}>
                <Route exact path={"/"} render={() => {
                    setHomePageValidation(false);
                    return productGridItems;
                }}>
                </Route>
                <Route path={"/products&page=:pageNumber"} render={({match}) => {
                    setPage(+match.params.pageNumber);
                    setHomePageValidation(true);
                    return productGridItems
                }}>
                </Route>
            </div>
            <Pagination size={"large"}
                        showFirstButton
                        showLastButton
                        count={pageAmount}
                        page={pageNumber}
                        onChange={handleChange}
                        className={[style.root, styles.pagination].join(" ")}
                        renderItem={params => (
                            <PaginationItem
                                component={NavLink}
                                to={`/products&page=${params.page}`}
                                {...params}/>
                        )}
            />
        </div>
    )
}