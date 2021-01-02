import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {ProductsContext} from "../ProductContext/ProductsContext";
import {ProductCardProps} from "../../../Utilities/ProductProps/ProductCardProps";
import styles from "./ProductModal.module.scss";
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";

const dialogStyle = makeStyles({
    paperFullWidth: {
        maxWidth: 1700
    }
});

const dividerStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}));

const initialProductState: ProductCardProps = {
    id: 0,
    name: "",
    description: "",
    pictureUrl: "",
    price: 0
};

export const ProductModal: React.FunctionComponent<{ id: number }> = props => {
    const [product, setProduct] = React.useState<ProductCardProps>(initialProductState);
    const [open, setOpen] = React.useState(true);
    const {productReq} = React.useContext(ProductsContext);
    const styleDialog = dialogStyle();

    const styleDivider = dividerStyle();
    const handleClose = () => {
        setOpen(false);

    };

    React.useEffect(() => {
        productReq
            .getProduct(props.id)
            .then(response => {
                setProduct(response);
                setOpen(true);
            });
    }, [productReq, props.id]);

    return (
        <Dialog fullWidth
                classes={{
                    paperFullWidth: styleDialog.paperFullWidth
                }}
                onClose={handleClose}
                aria-labelledby={"customized-dialog-title"}
                open={open}>
            <div className={styles.dialog}>
                <div className={styles.product_image}>
                    <img src={product.pictureUrl} alt={product.name}/>
                </div>
                <div className={[styles.divider, styleDivider.root].join(" ")}/>
                <div className={styles.content}>
                    <DialogTitle id={"customized-dialog-title"} className={styles.title} disableTypography>
                        {product.name}
                    </DialogTitle>
                    <p className={styles.price}>{`$ ${product.price}`}</p>
                    <div className={styles.amount}>
                        <RemoveCircleOutlineRoundedIcon/>
                        <AddCircleOutlineRoundedIcon/>
                    </div>
                    <Button className={styles.buy_now} color={"secondary"} variant={"contained"}>Buy Now</Button>
                    <Button className={styles.cart} color={"primary"} variant={"contained"}>Add to cart</Button>
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </Dialog>
    );
}
