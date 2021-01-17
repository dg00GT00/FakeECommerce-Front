import * as React from "react";
import { LandingMarketing } from "../../StructureSection/LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../../Utilities/Context/CartContext";
import { FloatingCart } from "../Cart/FloatingCart";
import { ProductPaginationManager } from "./ProductPaginationManager/ProductPaginationManager";
import { ProductsContextProvider } from "./ProductContext/ProductsContext";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			backgroundColor: theme.palette.primary.main,
		},
	})
);

export const ProductsSection: React.FunctionComponent = () => {
	const style = useStyles();
	const productContext = React.useContext(CartContext);

	const [floatingCart, setFloatingCart] = React.useState<JSX.Element | null>(
		null
	);

	React.useEffect(() => {
		const cartStyle = {
			position: "sticky",
			top: document.documentElement.clientHeight / 2,
		};
		if (productContext.totalAmount > 0) {
			setFloatingCart(<FloatingCart style={cartStyle} />);
		}
		if (productContext.totalAmount === 0) {
			setFloatingCart(null);
		}
	}, [productContext.totalAmount]);

	return (
		<section>
			<LandingMarketing color={"secondary"}>
				Take a look in our <span className={styles.fakeness}>Fakeness</span>
			</LandingMarketing>
			<ProductsContextProvider>
				<div className={[style.root, styles.grid_background].join(" ")}>
					<ProductPaginationManager />
					<div className={styles.floating_cart}>{floatingCart}</div>
				</div>
			</ProductsContextProvider>
		</section>
	);
};
