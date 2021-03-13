import * as React from "react";
import {ListItem, Modal, useMediaQuery} from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {BasketContext} from "../../../../Utilities/Context/BasketContext";
import {makeStyles, Theme} from "@material-ui/core/styles";
import List from "@material-ui/core/List/List";
import IconButton from "@material-ui/core/IconButton";
import styles from "./ModalDrawer.module.scss";
import Button from "@material-ui/core/Button/Button";
import {useCheckoutRoute} from "../../../../Utilities/CustomHooks/CheckoutRoute/useCheckoutRoute";

const drawerStyle = makeStyles((theme: Theme) => ({
	listRoot: {
		backgroundColor: theme.palette.common.white,
	},
	dividerRoot: {
		backgroundColor: theme.palette.primary.main,
	},
}));

type ModalDrawerProps = { open: boolean; containerId: string };

// Needed to use the React.memo in order to this component work properly
export const ModalDrawer: React.FunctionComponent<ModalDrawerProps> = React.memo(props => {
	const {
		getTotalProducts,
		getAmountById,
		clearItemsById,
	} = React.useContext(BasketContext);

	const firstRender = React.useRef(true);
	const [open, setOpen] = React.useState(false);
	const setItems = React.useState<{ [i: number]: number }>({})[1];

		const styleDrawer = drawerStyle();
		const goToCheckout = useCheckoutRoute();
		const media = useMediaQuery("(max-width: 600px)");

		const clearBasketItems = (id: number): void => {
			setItems(prevState => {
				const state = prevState && {};
				const newState = {
					...state,
					[id]: clearItemsById(id),
				};
				if (getTotalProducts().length === 0) {
					setOpen(false);
				}
				return newState;
			});
		};

		React.useEffect(() => {
			if (!firstRender.current) {
				setOpen(true);
			} else {
				firstRender.current = false;
			}
		}, [props.open]);

	const handleClose: React.MouseEventHandler = (event) => {
		setOpen(false);
	};

	const productList = getTotalProducts().map(basket => {
		return (
			<ListItem
				key={basket.productId}
				className={styles.item_grid}
				classes={{root: styleDrawer.listRoot}}>
				<div className={styles.image}>
					<img src={basket.pictureUrl} alt={basket.productName}/>
				</div>
				<p className={styles.name}>{basket.productName}</p>
				<p className={styles.price}>$ {basket.price}</p>
				<p className={styles.quantity}>
					<span>qty: </span>
					{getAmountById(basket.productId)}
				</p>
				<Button
					className={styles.clear}
					variant={"outlined"}
					onClick={_ => clearBasketItems(basket.productId)}>
					Clear Items
				</Button>
				</ListItem>
			);
		});

		const modal = (
			<Modal
				open={open}
				disableAutoFocus
				disableBackdropClick
				onClose={handleClose}
				container={document.getElementById(props.containerId)}
				BackdropProps={{
					style: {
						position: "initial",
						width: "100%",
					},
				}}
				style={{
					position: "absolute",
					display: "flex",
				}}>
				<div className={[styleDrawer.listRoot, styles.modal_container].join(" ")}>
					<IconButton onClick={handleClose} className={styles.close_button}>
						<CancelRoundedIcon/>
					</IconButton>
					<div className={[styles.divider, styleDrawer.dividerRoot].join(" ")}/>
					<List className={[styleDrawer.listRoot, styles.items].join(" ")}>
						{productList}
					</List>
					<Button
						variant={"contained"}
						color={"secondary"}
						onClick={goToCheckout}
						className={styles.checkout}>
						Checkout
					</Button>
				</div>
			</Modal>
		);

		return !media ? modal : null;
	}
);
