import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import styles from "./ProductFiltersMobile.module.scss";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import {useScrollPosition} from "../../../../Utilities/CustomHooks/useScrollPosition";
import {ProductFilterDialog} from "./ProductDialog/ProductFilterDialog";
import {CartDefault} from "../../../Cart/CartDefault";
import {FilterOptionsWithIndicator} from "./ProductFilterOptions/FilterOptionsWithIndicator";
import {DialogTypesEnum} from "./ProductDialog/DialogTypesEnum";
import {ClearFiltersContext} from "../../../../Utilities/Context/ClearFiltersContext";
import {FilterOptions, ProductFilterState} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import ListSubheader from "@material-ui/core/ListSubheader";
import {FilterMenu} from "./FilterMenu/FilterMenu";
import {useForceUpdate} from "../../../../Utilities/CustomHooks/useForceUpdate";
import {SearchMenu} from "./SearchMenu/SearchMenu";


const clearButtonStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            justifyContent: "center",
            margin: "6%",
            borderRadius: "3px",
            color: theme.palette.common.white
        }
    })
})

export const ProductFiltersMobile: React.FunctionComponent = () => {

    const {setClear} = React.useContext(ClearFiltersContext);

    const forceUpdate = useForceUpdate();
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [openProductType, setProductTypeDialog] = React.useState(false);
    const [openProductBrand, setProductBrandDialog] = React.useState(false);
    const searchBarAnchor = React.useRef<HTMLDivElement | null>(null);

    const clearStyle = clearButtonStyles();

    const theme = useTheme();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        forceUpdate();
    };

    const handleClearFilters = () => {
        setClear();
        forceUpdate();
        handleClose();
    }

    const handleProductDialog = (event: React.MouseEvent) => {
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
            searchBarAnchor.current.style.boxShadow = "0 4px 9px 0 #00000057";
        }
        if (currentPosition.y > 0 && searchBarAnchor.current) {
            searchBarAnchor.current.style.boxShadow = "none";
        }
    }, {element: searchBarAnchor});

    return (
        <div className={styles.mobile_filters_container}
             style={{backgroundColor: theme.palette.primary.main}}
             ref={searchBarAnchor}>
            <div className={styles.mobile_filters}>
                <SearchMenu/>
                <CartDefault classNameButton={styles.cart} hideWhenZero/>
                <FilterMenu onClick={handleClick}/>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}>
                    <ListSubheader>Filter by</ListSubheader>
                    <FilterOptionsWithIndicator
                        noRequestThroughNavigation
                        clickAction={event => handleProductDialog(event)}
                        filterType={FilterOptions.Type}
                        typeId={FilterOptions.Type}
                        filterState={ProductFilterState.FilterType}
                        rootId={["productType"]}
                        filterOptions={["Product Type"]}/>
                    <FilterOptionsWithIndicator
                        noRequestThroughNavigation
                        clickAction={event => handleProductDialog(event)}
                        filterType={FilterOptions.Brand}
                        filterState={ProductFilterState.FilterBrand}
                        typeId={FilterOptions.Brand}
                        rootId={["productBrand"]}
                        filterOptions={["Product Brand"]}/>
                    <FilterOptionsWithIndicator
                        clickAction={handleClose}
                        filterType={FilterOptions.Sort}
                        typeId={FilterOptions.Sort}
                        filterState={ProductFilterState.FilterSort}
                        subHeader={"Sort By"}
                        filterOptions={["Alphabetically", "Reverse Alphabetically", "Lower Price", "Higher Price"]}/>
                    <MenuItem onClick={handleClearFilters} className={clearStyle.root}>Clear</MenuItem>
                </Menu>
            </div>
            <ProductFilterDialog
                open={openProductType}
                onClose={(_ => setProductTypeDialog(false))}
                dialogTitle={DialogTypesEnum.ProductTypes}
                dialogItems={["Men Clothing", "Jewelry", "Electronic", "Women Clothing"]}/>
            <ProductFilterDialog
                open={openProductBrand}
                onClose={(_ => setProductBrandDialog(false))}
                dialogTitle={DialogTypesEnum.ProductBrands}
                dialogItems={["Men Styled Clothing", "New Jewelry", "Super Electronic", "Women Styled Clothing", "Women Loving", "Samsung"]}/>
        </div>
    )
}