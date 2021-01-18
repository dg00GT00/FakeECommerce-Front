import { isWidthDown } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as React from "react";

const dividerStyle = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		width: "10%",
		height: 3,
		margin: "13px auto 0",
	},
}));

export const CheckoutFormHeader: React.FunctionComponent<{ title: string }> = (
	props
) => {
	const styleDivider = dividerStyle();

	return (
		<>
			<p style={{ textAlign: "center" }}>{props.title}</p>
			<div className={styleDivider.root} />
			{props.children}
		</>
	);
};
