import * as React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {MessageStateProps} from "../../../UserManagerSection/UserActions/UserActionTypes";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";

const snackbarStyle = makeStyles<Theme,
    { color?: string; severity?: "error" | "info" | "warning" | "success" }>((theme) => {
    return createStyles({
        overrideColor: {
            background: (props) =>
                props.color ?? theme.palette[props.severity ?? "info"].main,
        },
    });
});

const generateRandomKey = () => {
    return Date.parse(Date()) * Math.random();
}

type SnackbarMessageProps = MessageStateProps & {
    key: number;
    snackOpen: boolean;
};

type MessageAction =
    | { type: "SET_MESSAGE"; messageProps: MessageStateProps }
    | { type: "CLOSE_SNACK"; closedMessageState: SnackbarMessageProps }
    | { type: "SET_UNDEFINED" };

const messageReducer = (prevState: SnackbarMessageProps | undefined, action: MessageAction): SnackbarMessageProps | undefined => {
    switch (action.type) {
        case "SET_MESSAGE":
            return {
                ...prevState,
                ...action.messageProps,
                snackOpen: true,
                key: generateRandomKey(),
            };
        case "CLOSE_SNACK":
            return action.closedMessageState;
        case "SET_UNDEFINED":
            return undefined;
        default:
            return prevState;
    }
};

/**
 * Set a snackbar based on a set of message properties
 * @return an array with an user snack element an function to set message properties
 */
export const useUserSnackbar = (): [JSX.Element | null, (messageProps: MessageStateProps) => void] => {
    const initialMessageState: SnackbarMessageProps = {
        key: generateRandomKey(),
        message: "",
        snackOpen: false,
        severity: "info",
    };

    const [snackMessage, dispatchSnackMessage] = React.useReducer(
        messageReducer,
        initialMessageState
    );
    const style = snackbarStyle({
        color: snackMessage?.color,
        severity: snackMessage?.severity,
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
        dispatchSnackMessage({type: "CLOSE_SNACK", closedMessageState: initialMessageState});
    };

    const handleExited = (): void => {
        dispatchSnackMessage({type: "SET_UNDEFINED"});
    };

    const snack = (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            open={snackMessage?.snackOpen}
            key={snackMessage?.key}
            onExited={handleExited}
            onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={snackMessage?.severity}
                variant={"filled"}
                classes={{
                    filledError: style.overrideColor,
                    filledInfo: style.overrideColor,
                    filledSuccess: style.overrideColor,
                    filledWarning: style.overrideColor,
                }}
                action={snackMessage?.children}>
                {snackMessage?.message}
            </Alert>
        </Snackbar>
    );

    return [
        snack,
        React.useCallback((messageProps: MessageStateProps): void => {
            dispatchSnackMessage({type: "SET_MESSAGE", messageProps});
        }, []),
    ];
};
