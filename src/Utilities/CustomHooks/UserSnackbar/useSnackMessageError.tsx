import * as React from "react";
import {FormId} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {ResponseStatusCode} from "../../RouterValidation/ResponseStatusCodes";
import {useUserSnackbar} from "./useUserSnackbar";
import {MessageStateProps} from "../../../UserManagerSection/UserActions/UserActionTypes";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";

const errorMessageByFormId = (formId: FormId, statusCode: number): string => {
    let errorMessage = "";
    switch (formId) {
        case FormId.SIGNUP:
            if (statusCode === ResponseStatusCode["400"]) {
                errorMessage = "Error at creating an account";
            }
            if (statusCode === ResponseStatusCode["401"]) {
                errorMessage = "Email or password wrong!";
            }
            break;
        case FormId.LOGIN:
            if (statusCode === ResponseStatusCode["400"]) {
                errorMessage = "Error at creating an account";
            }
            if (statusCode === ResponseStatusCode["401"]) {
                errorMessage = "Email or password wrong!";
            }
            break;
        case FormId.ADDRESS:
            if (statusCode === ResponseStatusCode["400"]) {
                errorMessage = "Error during setting address";
            }
            if (statusCode === ResponseStatusCode["401"]) {
                errorMessage = "Account timeout. Effect login";
            }
            break;
        default:
            errorMessage = "Something went wrong. Try again!";
    }
    return errorMessage;
};

/**
 * The specific user snackbar for displaying error messages
 * @return an array with the error snackbar and a function to fill up the error snack properties
 */
export const useSnackMessageError = (): [JSX.Element | null, (formId: FormId, statusCode: number) => void] => {
    const [snack, setSnackError] = useUserSnackbar();
    const {palette: {primary: {dark}}} = useTheme();
    const {push} = useHistory();

    return [
        snack,
        (formId: FormId, statusCode: number): void => {
            const goToLogin: React.MouseEventHandler = event => {
                push("/user/login");
            }

            const message = errorMessageByFormId(formId, statusCode);
            const messageState: MessageStateProps = {message, severity: "error"};

            if (formId === FormId.ADDRESS && statusCode === 401) {
                messageState.severity = "warning";
                messageState.color = dark;
                messageState.children = <Button color={"secondary"} onClick={goToLogin}>Login</Button>
            }
            setSnackError(messageState);
        }
    ];
}