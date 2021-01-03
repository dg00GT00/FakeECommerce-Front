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
import IconButton from "@material-ui/core/IconButton";
import {CartDefault} from "../../Cart/CartDefault";

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

type InitialModalProductsType = ProductCardProps;

const initialModalProducts: InitialModalProductsType = {
    id: 0,
    price: 0,
    productName: "",
    description: "",
    pictureUrl: "",
    brand: "",
    type: ""
};

// The key property forces this component to rerender
export const ProductModal: React.FunctionComponent<{ id: number, key: number }> = props => {
    const [product, setProduct] = React.useState<InitialModalProductsType>(initialModalProducts);
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
                setOpen(true);
                setProduct(response);
            });
    }, [productReq, props.id, props.key]);

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
                    <img src={product.pictureUrl} alt={product.productName}/>
                </div>
                <div className={[styles.divider, styleDivider.root].join(" ")}/>
                <div className={styles.content}>
                    <DialogTitle id={"customized-dialog-title"} className={styles.title} disableTypography>
                        {product.productName}
                    </DialogTitle>
                    <p className={styles.price}>{`$ ${product.price}`}</p>
                    <div className={styles.amount}>
                        <IconButton>
                            <RemoveCircleOutlineRoundedIcon/>
                        </IconButton>
                        <IconButton>
                            <AddCircleOutlineRoundedIcon/>
                        </IconButton>
                    </div>
                    <Button className={styles.buy_now} color={"secondary"} variant={"contained"}>Buy Now</Button>
                    <Button className={styles.add_cart} color={"primary"} variant={"contained"}>Add to cart</Button>
                    <p className={styles.description}>{product.description}</p>
                    <CartDefault classNameButton={styles.cart} hideWhenZero/>
                </div>
            </div>
        </Dialog>
    );
}
