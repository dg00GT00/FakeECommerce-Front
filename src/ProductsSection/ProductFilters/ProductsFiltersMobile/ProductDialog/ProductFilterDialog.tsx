import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {FilterOptions, ProductFilterState} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {DialogTypesEnum} from './DialogTypesEnum';
import {FilterOptionsWithIndicator} from "../ProductFilterOptions/FilterOptionsWithIndicator";

type ProductDialogProps = {
    onClose: React.MouseEventHandler<HTMLElement>;
    dialogTitle: DialogTypesEnum
    dialogItems: string[];
    open: boolean;
}

export const ProductFilterDialog: React.FunctionComponent<ProductDialogProps> = props => {
    const productFilterRoute = useProductFilterRoute;
    let pushToRoute: (queryValue?: string) => void;

    switch (props.dialogTitle) {
        case DialogTypesEnum.ProductTypes:
            pushToRoute = productFilterRoute(FilterOptions.Type, ProductFilterState.FilterType);
            break;
        case DialogTypesEnum.ProductBrands:
            pushToRoute = productFilterRoute(FilterOptions.Brand, ProductFilterState.FilterBrand);
            break;
    }

    const handleClick: React.MouseEventHandler<HTMLElement> = event => {
        pushToRoute(event.currentTarget.textContent?.toLowerCase());
        props.onClose(event);
    }

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">{props.dialogTitle}</DialogTitle>
            <FilterOptionsWithIndicator
                clickAction={handleClick}
                filterOptions={props.dialogItems}
                filterState={props.dialogTitle === DialogTypesEnum.ProductTypes ? ProductFilterState.FilterType : ProductFilterState.FilterBrand}
                filterType={props.dialogTitle === DialogTypesEnum.ProductTypes ? FilterOptions.Type : FilterOptions.Brand}
                typeId={props.dialogTitle === DialogTypesEnum.ProductTypes ? "dialog_type" : "dialog_brand"}/>
        </Dialog>
    );
}