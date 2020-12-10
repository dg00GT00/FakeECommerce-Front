import * as React from "react";
import styles from "../ProductPaginationManager/ProductPaginationManager.module.scss";
import {ProductNavigation} from "../ProductNavigation/ProductNavigation";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {NavLink, Route} from "react-router-dom";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductsContext} from "../ProductContext/ProductsContext";
import {ProductGridItems} from "../ProductGridItems/ProductGridItems";

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

export const ProductPaginationManager: React.FunctionComponent = () => {
    const style = useStyles();
    const {pageCount, isHomePage, pageNumber: urlPageNumber} = React.useContext(ProductsContext);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [scrollToGrid, setScroll] = React.useState(false);

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isHomePage){
            timer = setTimeout(handleScrollGridItems, 300);
        }
        return () => clearTimeout(timer);
    }, [scrollToGrid, isHomePage])

    const handleScrollGridItems = () => {
        const productFiltersBar = document.getElementById("productsContent");
        productFiltersBar?.scrollIntoView({behavior: "smooth"});
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPageNumber(value);
        setScroll(prevState => !prevState);
    };

    return (
        <div className={styles.grid_container}>
            <ProductNavigation/>
            <div className={styles.grid_content} id={"productsContent"}>
                <Route exact path={"/"}>
                    <ProductGridItems pageNumber={pageNumber}/>
                </Route>
                <Route path={"/products&page=:pageNumber"} render={({match}) => (
                    <ProductGridItems pageNumber={+match.params.pageNumber}/>
                )}/>
            </div>
            <Pagination size={"large"}
                        showFirstButton
                        showLastButton
                        count={pageCount}
                        page={urlPageNumber || pageNumber}
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