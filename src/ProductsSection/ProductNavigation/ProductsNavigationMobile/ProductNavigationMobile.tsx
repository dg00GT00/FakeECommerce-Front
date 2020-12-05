import * as React from "react";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import styles from "./ProductNavigationMobile.module.scss";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {InputBase, Paper, useTheme} from "@material-ui/core";
import {useScrollPosition} from "../../../Utilities/useScrollPosition";
import {ProductFilterDialog} from "./ProductDialog/ProductFilterDialog";

const seeMoreStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fill: theme.palette.secondary.main
        }
    })
})

const searchBarStyle = makeStyles({
    root: {
        backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
    }
})

// TODO: Refactor the code in order to eliminate repetition
export const ProductNavigationMobile: React.FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [openProductType, setProductTypeDialog] = React.useState(false);
    const [openProductBrand, setProductBrandDialog] = React.useState(false);
    const searchBarAnchor = React.useRef<HTMLDivElement | null>(null);

    const moreStyle = seeMoreStyle();
    const searchStyle = searchBarStyle();
    const theme = useTheme();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProductDialog = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget.id === "productType") {
            setProductTypeDialog(true);
        }
        if (event.currentTarget.id === "productBrand") {
            setProductBrandDialog(true);
        }
        setAnchorEl(null);
    }

    useScrollPosition(({previousPosition, currentPosition}) => {
        if (currentPosition.y === 0 && searchBarAnchor.current) {
            searchBarAnchor.current.style.boxShadow = "0 4px 9px 0 #00000057"
        }
        if (currentPosition.y > 0 && searchBarAnchor.current) {
            searchBarAnchor.current.style.boxShadow = "none"
        }
    }, searchBarAnchor)

    return (
        <div className={styles.mobile_filters_container}
             style={{backgroundColor: theme.palette.primary.main}}
             ref={searchBarAnchor}>
            <div className={styles.mobile_filters}>
                <Paper className={[styles.product_search, searchStyle.root].join(" ")}>
                    <IconButton aria-label={"search"}>
                        <SearchRoundedIcon className={styles.search_icon}/>
                    </IconButton>
                    <InputBase placeholder={"Search"} fullWidth className={styles.input_search_bar}/>
                </Paper>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertRoundedIcon className={moreStyle.root}/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}>
                    <ListSubheader>Filter by</ListSubheader>
                    <MenuItem id={"productType"} onClick={handleProductDialog}>Product Type</MenuItem>
                    <MenuItem id={"productBrand"} onClick={handleProductDialog}>Product Brand</MenuItem>
                    <ListSubheader>Sort by</ListSubheader>
                    <MenuItem>Alphabetically</MenuItem>
                    <MenuItem>Lower Price</MenuItem>
                    <MenuItem>Higher Price</MenuItem>
                </Menu>
            </div>
            <ProductFilterDialog
                open={openProductType}
                onClose={(event => setProductTypeDialog(false))}
                dialogTitle={"Product Type"}
                dialogItems={["Men Clothing", "Jewelry", "Electronics", "Women Clothing"]}/>
            <ProductFilterDialog
                open={openProductBrand}
                onClose={(event => setProductBrandDialog(false))}
                dialogTitle={"Product Brands"}
                dialogItems={["Men Styled Clothing", "New Jewelry", "Super Electronic", "Women Styled Clothing", "Women Loving", "Samsung"]}/>
        </div>
    )
}