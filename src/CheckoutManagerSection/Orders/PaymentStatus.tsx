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

const mapPaymentIntentStatus = (statusNumber: number, statusColor: StatusColor): PaymentStatusProps => {
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

export const PaymentStatus: React.FunctionComponent<{ status: number }> = props => {
    const theme = useTheme();

    const statusColor: StatusColor = {
        Pending: {chipColor: theme.palette.warning.light, textColor: "#6d4822"},
        PaymentReceived: {chipColor: theme.palette.success.light, textColor: "#226d37"},
        PaymentFailed: {chipColor: theme.palette.error.light, textColor: "#6d2222"}
    };

    const statusObj = mapPaymentIntentStatus(props.status, statusColor);

    const styleChip = chipStyle({...statusObj.chipStatus});

    return (
        <Chip
            size={"small"}
            label={statusObj.statusMessage}
            classes={{
                root: styleChip.root
            }}
        />
    );
}