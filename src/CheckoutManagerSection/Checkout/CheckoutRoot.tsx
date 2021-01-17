import * as React from "react";
import { Paper } from "@material-ui/core";
import { ReactComponent as Logo } from "../../Assets/eCommerceBaseLogo.svg";
import { ReactComponent as FakeCreditCard } from "../../Assets/Checkout/fakeCredictCard.svg";
import { ReactComponent as GPlay } from "../../Assets/Checkout/google-pay-primary-logo.svg";
import { ReactComponent as Paypal } from "../../Assets/Checkout/paypal-seeklogo.com.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { CheckoutCart } from "../CheckoutCart/CheckoutCart";
import styles from "./CheckoutRoot.module.scss";
import { ShippingOptions } from "../ShippingOptions/ShippingOptions";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NotFound } from "../../Utilities/RouterValidation/NotFound";

const fakeCardStyle = makeStyles((theme: Theme) => ({
	fakeCard: {
		backgroundColor: theme.palette.primary.dark,
	},
	payPal: {
		backgroundColor: theme.palette.secondary.main,
	},
	divider: {
		backgroundColor: theme.palette.primary.main,
	},
	badge: {
		color: "white",
	},
}));

export const CheckoutRoot: React.FunctionComponent = () => {
	const styleFakeCard = fakeCardStyle();
	const { path } = useRouteMatch();

	return (
		<section className={styles.container}>
			<div className={styles.inner_container}>
				<div className={styles.checkout_header}>
					<Logo className={styles.logo} />
					<div className={styles.express_checkout}>
						<div className={styles.tags}>
							<Paper>
								<GPlay className={styles.gplay} />
							</Paper>
							<Paper className={styleFakeCard.payPal}>
								<Paypal className={styles.paypal} />
							</Paper>
							<Paper className={styleFakeCard.fakeCard}>
								<FakeCreditCard className={styles.fakeCard} />
								<p className={styleFakeCard.badge}>FakeCard</p>
							</Paper>
						</div>
					</div>
					<div className={styles.checkout_forms}>
						<Switch>
							<Route exact path={`${path}/shipping`}>
								<ShippingOptions />
							</Route>
                            <Route>
                                <NotFound color={"black"}/>
                            </Route>
						</Switch>
					</div>
				</div>
			</div>
			<div className={styles.divider_group}>
				<div className={styles.divider_superior}>
					<div />
					<div className={styleFakeCard.divider} />
				</div>
				<div className={styles.divider_inferior}>
					<div className={styleFakeCard.divider} />
					<div />
				</div>
			</div>
			<div className={styles.cart}>
				<CheckoutCart />
			</div>
		</section>
	);
};
