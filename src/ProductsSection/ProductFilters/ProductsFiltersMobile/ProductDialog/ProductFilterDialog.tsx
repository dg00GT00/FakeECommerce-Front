import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {useProductFilterRoute} from "../../../../Utilities/CustomHooks/useProductFilterRoute";
import {FilterOptions, ProductFilterState} from "../../../../Utilities/ProductModels/ProductFiltersEnum";
import {DialogTypesEnum} from './DialogTypesEnum';
import {FilterOptionsWithIndicator} from "../ProductFilterOptions/FilterOptionsWithIndicator";
import {ClearFiltersContext} from "../../../../Utilities/Context/ClearFiltersContext";

type ProductDialogProps = {
    onClose: React.MouseEventHandler;
    dialogTitle: DialogTypesEnum
    dialogItems: string[];
    open: boolean;
}

export const ProductFilterDialog: React.FunctionComponent<ProductDialogProps> = props => {
    const productFilterRoute = useProductFilterRoute;
    const {clearSwitch} = React.useContext(ClearFiltersContext);
    const [indicatorStyle, setIndicatorStyle] = React.useState<{ [i: string]: { backgroundColor: string}; }>({});
    let pushToRoute: (queryValue?: string) => void;

    switch (props.dialogTitle) {
        case DialogTypesEnum.ProductTypes:
            pushToRoute = productFilterRoute(FilterOptions.Type, ProductFilterState.FilterType);
            break;
        case DialogTypesEnum.ProductBrands:
            pushToRoute = productFilterRoute(FilterOptions.Brand, ProductFilterState.FilterBrand);
            break;
    }

    const onEntering= (node: HTMLElement, isAppearing: boolean) => {
        node.childNodes.forEach(node => {
            node.childNodes.forEach(innerNode => {
                const indicatorEl = innerNode.nextSibling?.childNodes[1];
                if (indicatorEl) {
                    const childId = (indicatorEl as HTMLElement).getAttribute("id");
                    if (childId) {
                        if (indicatorStyle[childId] && indicatorStyle[childId].backgroundColor !== "initial") {
                            (indicatorEl as HTMLElement).style.backgroundColor = indicatorStyle[childId].backgroundColor;
                        }
                    }
                }
            })
        });
    }

    const handleClick = (event: React.MouseEvent, index: number) => {
        const typeId = props.dialogTitle === DialogTypesEnum.ProductTypes ? "dialog_type" : "dialog_brand";
        const id = `${typeId}_${index}`;
        setIndicatorStyle(prevIndicator => {
            const indicator = prevIndicator || indicatorStyle;
            const indicatorEl = document.getElementById(id);
            if (indicatorEl) {
                const backgroundColor = window.getComputedStyle(indicatorEl).backgroundColor;
                indicator[id] = {...indicator[id], backgroundColor};
            }
            for (const indicatorId in indicator) {
                if (indicatorId !== id) {
                    indicator[indicatorId] = {...indicator[indicatorId], backgroundColor: "initial"};
                }
            }
            return indicator;
        })
        pushToRoute(event.currentTarget.textContent?.toLowerCase());
        props.onClose(event);
    }

    React.useEffect(() => {
        setIndicatorStyle({});
    }, [clearSwitch])

    return (
        <Dialog onClose={props.onClose}
                onEntering={onEntering}
                aria-labelledby="simple-dialog-title"
                open={props.open}>
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