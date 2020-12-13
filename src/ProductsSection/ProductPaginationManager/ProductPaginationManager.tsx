import * as React from "react";
import styles from "../ProductPaginationManager/ProductPaginationManager.module.scss";
import {ProductFilters} from "../ProductFilters/ProductFilters";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import {NavLink} from "react-router-dom";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ProductsContext} from "../ProductContext/ProductsContext";
import {handleScrollGridItems, PRODUCT_GRID_ID} from "../../Utilities/ProductGridScroll";
import {
    ProductFilterEnum,
    ProductRouteManager,
    UrlQueryFilter
} from "../../Utilities/Routes/ProductRouteManager/ProductRouteManager";


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
        if (!isHomePage) {
            timer = setTimeout(handleScrollGridItems, 300);
        }
        return () => clearTimeout(timer);
    }, [scrollToGrid, isHomePage])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPageNumber(value);
        setScroll(prevState => !prevState);
    };

    return (
        <div className={styles.grid_container}>
            <ProductFilters/>
            <div className={styles.grid_content} id={PRODUCT_GRID_ID}>
                <ProductRouteManager pageNumber={pageNumber}/>
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
                                to={{
                                    pathname: "/products",
                                    search: `${UrlQueryFilter.Page}=${params.page}`,
                                    state: {filter: [ProductFilterEnum.FilterPageNumber]}
                                }}{...params}/>
                        )}
            />
        </div>
    )
}