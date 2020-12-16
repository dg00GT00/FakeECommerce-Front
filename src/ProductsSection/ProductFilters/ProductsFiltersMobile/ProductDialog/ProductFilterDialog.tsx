import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {ProductFilterState, UrlQueryFilter} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {DialogTypesEnum} from './DialogTypesEnum';

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
            pushToRoute = productFilterRoute(UrlQueryFilter.Type, ProductFilterState.FilterType);
            break;
        case DialogTypesEnum.ProductBrands:
            pushToRoute = productFilterRoute(UrlQueryFilter.Brand, ProductFilterState.FilterBrand);
            break;
    }

    const handleClick: React.MouseEventHandler<HTMLElement> = event => {
        pushToRoute(event.currentTarget.textContent?.toLowerCase());
        props.onClose(event);
    }

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">{props.dialogTitle}</DialogTitle>
            <List>
                {props.dialogItems.map((product, index) => (
                    <ListItem button key={`dialog_${index}`}>
                        <ListItemText onClick={handleClick} primary={product}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}