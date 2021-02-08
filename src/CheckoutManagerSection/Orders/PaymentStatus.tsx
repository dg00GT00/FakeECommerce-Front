import * as React from "react";
import {PaymentStatusEnum} from "../../Utilities/OrderModel/OrderModel";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Chip from '@material-ui/core/Chip';

type ChipColor = { chipColor: string, textColor: string; }

type PaymentStatusProps = {
    statusMessage: string | null;
    chipStatus: ChipColor;
}

type StatusColor = Record<keyof typeof PaymentStatusEnum, ChipColor>;

const mapPaymentIntentStatusString = (statusString: string): number => {
    let statusNumber = 0;
    if (statusString === "Payment Pending") {
        statusNumber = 0;
    }
    if (statusString === "Payment Received") {
        statusNumber = 1;
    }
    if (statusString === "Payment Failed") {
        statusNumber = 2;
    }
    return statusNumber;
}

const mapPaymentIntentStatusNumber = (statusNumber: number, statusColor: StatusColor): PaymentStatusProps => {
    const statusObj: PaymentStatusProps = {statusMessage: null, chipStatus: {chipColor: "", textColor: ""}};
    if (statusNumber === 0) {
        statusObj.statusMessage = PaymentStatusEnum.Pending;
        statusObj.chipStatus = statusColor.Pending;
    }
    if (statusNumber === 1) {
        statusObj.statusMessage = PaymentStatusEnum.PaymentReceived;
        statusObj.chipStatus = statusColor.PaymentReceived;
    }
    if (statusNumber === 2) {
        statusObj.statusMessage = PaymentStatusEnum.PaymentFailed;
        statusObj.chipStatus = statusColor.PaymentFailed;
    }
    return statusObj;
};

const chipStyle = makeStyles<Theme, { chipColor: string, textColor: string }>((theme) => {
    return createStyles({
        root: {
            backgroundColor: props => props.chipColor,
            color: props => props.textColor,
        }
    });
});

export const PaymentStatus: React.FunctionComponent<{ status: number | string, className?: string }> = props => {
    let {status} = props;

    const theme = useTheme();

    const statusColor: StatusColor = {
        Pending: {chipColor: theme.palette.warning.light, textColor: "#6d4822"},
        PaymentReceived: {chipColor: theme.palette.success.light, textColor: "#226d37"},
        PaymentFailed: {chipColor: theme.palette.error.light, textColor: "#6d2222"}
    };

    if (typeof status === "string") {
        status = mapPaymentIntentStatusString(status);
    }

    const statusObj = mapPaymentIntentStatusNumber(status, statusColor);

    const styleChip = chipStyle({...statusObj.chipStatus});

    return (
        <Chip
            size={"small"}
            className={props.className}
            label={statusObj.statusMessage}
            classes={{
                root: styleChip.root
            }}
        />
    );
}