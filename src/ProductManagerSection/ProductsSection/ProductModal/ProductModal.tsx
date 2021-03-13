import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import {ProductsContext} from "../ProductContext/ProductsContext";
import {ProductCardProps} from "../../../Utilities/ProductProps/ProductCardProps";
import styles from "./ProductModal.module.scss";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton";
import {BasketContext} from "../../../Utilities/Context/BasketContext";
import {ModalDrawer} from "./ModalDrawer/ModalDrawer";
import {useMediaQuery} from "@material-ui/core";
import {CartDefault} from "../../Cart/CartDefault";

const modalId = "productModal";

const dialogStyle = makeStyles({
	root: {
		position: "relative",
	},
	paperFullWidth: {
		maxWidth: 1700,
	},
	paperScrollPaper: {
		maxHeight: "initial",
	},
});

const dividerStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
	},
}));

const initialModalProducts: ProductCardProps = {
	productId: 0,
	price: 0,
	productName: "",
	description: "",
	pictureUrl: "",
	brand: "",
	type: "",
};

// The modalKey property forces this component to rerender
export const ProductModal: React.FunctionComponent<{ id: number; modalKey: number; }> = props => {
	const {productReq} = React.useContext(ProductsContext);
	const cartContext = React.useContext(BasketContext);

	const [productModal, setProductModal] = React.useState<ProductCardProps>(initialModalProducts);
	const [productAmount, setProductAmount] = React.useState(0);
	const [openDialog, setOpenDialog] = React.useState(true);
	const [openDrawer, setOpenDrawer] = React.useState(false);

	const media = useMediaQuery("(max-width: 600px)");
	const styleDialog = dialogStyle();
	const styleDivider = dividerStyle();

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const increaseProductAmount: React.MouseEventHandler = (event) => {
		setProductAmount((prevState) => {
			let state = prevState ?? productAmount;
			if (productAmount >= 1000) {
				return state;
			} else {
				return ++state;
			}
		});
	};

	const decreaseProductAmount: React.MouseEventHandler = (event) => {
		setProductAmount((prevState) => {
			let state = prevState ?? productAmount;
			if (productAmount <= 0) {
				return state;
			} else {
				return --state;
			}
		});
	};

	const addToCart: React.MouseEventHandler = (event) => {
		cartContext.increaseAmount({ quantity: productAmount, ...productModal });
	};

	React.useEffect(() => {
		setProductAmount(cartContext.getAmountById(props.id));
	}, [cartContext, props.id]);

	React.useEffect(() => {
		productReq.getProduct(props.id).then(response => {
			setOpenDialog(true);
			setProductModal(response);
		});
	}, [productReq, props.id, props.modalKey]);

	return (
		<Dialog
			fullWidth
			classes={{
				root: styleDialog.root,
				paperFullWidth: styleDialog.paperFullWidth,
				paperScrollPaper: styleDialog.paperScrollPaper,
			}}
			onClose={handleCloseDialog}
			aria-labelledby={"customized-dialog-title"}
			open={openDialog}>
			<div className={styles.dialog} id={modalId}>
				<div className={styles.product_image}>
					<img src={productModal.pictureUrl} alt={productModal.productName}/>
				</div>
				<div className={[styles.divider, styleDivider.root].join(" ")}/>
				<div className={styles.content}>
					<DialogTitle
						id={"customized-dialog-title"}
						className={styles.title}
						disableTypography>
						{productModal.productName}
					</DialogTitle>
					<p className={styles.price}>{`$ ${productModal.price}`}</p>
					<div className={styles.amount_control}>
						<IconButton onClick={decreaseProductAmount}>
							<RemoveCircleOutlineRoundedIcon />
						</IconButton>
						<span className={styles.amount}>{productAmount}</span>
						<IconButton onClick={increaseProductAmount}>
							<AddCircleOutlineRoundedIcon/>
						</IconButton>
					</div>
					<Button
						className={styles.add_cart}
						color={"primary"}
						variant={"contained"}
						onClick={addToCart}>
						Add to cart
					</Button>
					<p className={styles.description}>{productModal.description}</p>
					{!media ? (
						<CartDefault
							hideWhenZero
							classNameButton={styles.cart}
							onClick={event => setOpenDrawer(!openDrawer)}
						/>
					) : null}
				</div>
			</div>
			<ModalDrawer open={openDrawer} containerId={modalId} />
		</Dialog>
	);
};
