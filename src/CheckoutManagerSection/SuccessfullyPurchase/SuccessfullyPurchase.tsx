import * as React from "react";
import styles from "./SucessfullyPurchase.module.scss";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";

export const SuccessfullyPurchase: React.FunctionComponent = () => {
    const {push} = useHistory();

    return (
        <div className={styles.container}>
            <CheckCircleOutlineRoundedIcon className={styles.symbol}/>
            <p>Thank you for you money! You just have brought prime products</p>
            <Button
                className={styles.continue_buying}
                onClick={_ => push("/")}
                color={"primary"}
                variant={"contained"}>
                Continue Buying
            </Button>
        </div>
    );
}