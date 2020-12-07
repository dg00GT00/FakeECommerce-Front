import * as React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


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

export const ProductPagination = () => {
    const style = useStyles();
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Pagination size={"large"}
                    showFirstButton
                    showLastButton
                    count={10}
                    page={page}
                    onChange={handleChange}
                    className={style.root}/>
    );
}
