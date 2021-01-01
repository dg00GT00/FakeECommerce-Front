import * as React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {MessageStateProps} from "./UserActionTypes";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";

const snackbarStyle = makeStyles<Theme, MessageStateProps>((theme) => {
    return createStyles({
        overrideColor: {
            background: props => props.color ?? theme.palette.error.main
        }
    })
});

type SnackbarMessage = {
    message: string | undefined;
    key: number;
}

// Avoids the snackbar to loop after each stateCount increment
let outerStateCount: number;

export const UserSnackbar: React.FunctionComponent<MessageStateProps> = ({severity = "error", ...props}) => {
    const {children, message, messageStateCount} = props;
    const style = snackbarStyle(props);

    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

    React.useEffect(() => {
        if (message && outerStateCount !== messageStateCount) {
            outerStateCount = messageStateCount;
            setMessageInfo(prevState => {
                const state = prevState ?? {};
                setOpen(true);
                return {
                    ...state,
                    message: message,
                    key: new Date().getTime()
                };
            });
        }
    }, [messageInfo, message, messageStateCount]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            open={open}
            key={messageInfo?.key}
            onExited={handleExited}
            onClose={handleClose}>
            <Alert onClose={handleClose}
                   severity={severity}
                   variant={"filled"}
                   classes={{
                       filledError: style.overrideColor,
                       filledInfo: style.overrideColor,
                       filledSuccess: style.overrideColor,
                       filledWarning: style.overrideColor,
                   }}
                   action={children}>
                {messageInfo?.message}
            </Alert>
        </Snackbar>
    );
}