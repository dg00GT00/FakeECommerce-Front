import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

type ProductDialogProps = {
    open: boolean;
    onClose: React.MouseEventHandler<HTMLElement>;
    dialogTitle: string;
    dialogItems: string[];
}

export const ProductFilterDialog: React.FunctionComponent<ProductDialogProps> = props => {
    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">{props.dialogTitle}</DialogTitle>
            <List>
                {props.dialogItems.map((product) => (
                    <ListItem button key={product}>
                        <ListItemText primary={product}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}