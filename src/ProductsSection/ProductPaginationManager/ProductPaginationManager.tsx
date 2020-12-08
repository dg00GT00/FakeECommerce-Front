import * as React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {ProductNavigation} from "../ProductNavigation/ProductNavigation";
import {Route} from "react-router-dom";
import {ProductGrid} from "../ProductGrid/ProductGrid";
import styles from "./ProductPaginationManager.module.scss";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& svg": {
                fill: theme.palette.common.white
            },
            "& button, div": {
                color: theme.palette.common.white
            },
            "& .Mui-selected": {
                color: theme.palette.secondary.main,
                fontWeight: "bold"
            }
        },
    }),
);

export const ProductPaginationManager = () => {
    const style = useStyles();
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className={styles.grid_container}>
            <ProductNavigation/>
            <div className={styles.grid_content}>
                <Route path={"/products&page=:pageNumber"}>
                    <ProductGrid/>
                </Route>
            </div>
            <Pagination size={"large"}
                        showFirstButton
                        showLastButton
                        count={10}
                        page={page}
                        onChange={handleChange}
                        className={[style.root, styles.pagination].join(" ")}/>
        </div>
    );
}
