import * as React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {ProductNavigation} from "../ProductNavigation/ProductNavigation";
import {NavLink, Route} from "react-router-dom";
import {ProductGrid} from "../ProductGrid/ProductGrid";
import styles from "./ProductPaginationManager.module.scss";
import {ProductRequestManager} from "../../HttpRequests/ProductsRequests";
import {PaginationItem} from "@material-ui/lab";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& svg": {
                fill: theme.palette.common.white
            },
            "& button, a": {
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
const {getFullProductList, getProductPageAmount} = productReq;

export const ProductPaginationManager = () => {
    const style = useStyles();
    const [pageNumber, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={styles.grid_container}>
            <ProductNavigation/>
            <div className={styles.grid_content}>
                <Route path={`/products&page=:pageNumber`} render={({match}) => (
                    <ProductGrid productRequest={getFullProductList.bind(productReq, 12, match.params.pageNumber)}
                                 pageAmount={getProductPageAmount.bind(productReq)}/>
                )}>
                </Route>
            </div>
            <Pagination size={"large"}
                        showFirstButton
                        showLastButton
                        count={10}
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
