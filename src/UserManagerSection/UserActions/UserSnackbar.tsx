import * as React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {MessageState} from "./UserActionTypes";

type SnackbarMessage = {
    message: string | undefined;
    key: number;
}

// Avoids the snackbar to loop after each stateCount increase
let outerStateCount = 0;

export const UserSnackbar: React.FunctionComponent<MessageState> = props => {
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

    React.useEffect(() => {
        if (props.message && outerStateCount !== props.stateCount) {
            outerStateCount = props.stateCount;
            setMessageInfo(prevState => {
                const state = prevState ?? {};
                setOpen(true);
                return {
                    ...state,
                    message: props.message,
                    key: new Date().getTime()
                }
            });
        }
    }, [messageInfo, props.message, props.stateCount]);

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
            <Alert onClose={handleClose} severity={"error"} variant={"filled"}>
                {messageInfo?.message}
            </Alert>
        </Snackbar>
    );
}