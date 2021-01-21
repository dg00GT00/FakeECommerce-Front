import * as React from "react";
import styles from "../UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {FormId, FormState, UserFormButtonProps,} from "../UserFormsTypes/UserFormsTypes";
import {useSnackMessageError} from "../../Utilities/CustomHooks/UserSnackbar/useSnackMessageError";
import {CheckoutRoute} from "../../Utilities/CustomHooks/CheckoutRoute/CheckoutRoute";

const checkFormValues = (formObj: FormState<any>): boolean => {
    for (const key in formObj) {
        if (formObj.hasOwnProperty(key) && formObj[key].fieldValue) {
            return true;
        }
    }
    return false;
};

type SignupType = Record<"email" | "password" | "generic", { fieldValue: string }>;

type LoginType = Record<"generic" | "email", { fieldValue: string }>;

export const UserActionButton: React.FunctionComponent<UserFormButtonProps> = (props) => {
    const [errorSnack, setErrorSnack] = useSnackMessageError();
    const {registerUser, userLogin, userAddress} = React.useContext(AuthContext);
    const {goBack, push, location: {state}} = useHistory();

    const promiseError = React.useCallback((formId: FormId, statusCode: number) => {
            setErrorSnack(formId, statusCode);
        },
        [setErrorSnack]
    );

    const submitForm: React.MouseEventHandler = (event) => {
        if (props.formId === FormId.SIGNUP) {
            const {
                email: {fieldValue: email},
                password: {fieldValue: password},
                generic: {fieldValue: username},
            } = props.formState as SignupType;

            if (checkFormValues(props.formState)) {
                registerUser(username, email, password)
                    .then(_ => {
                        push({
                            pathname: "/user/address",
                        });
                    })
                    .catch(statusCode => promiseError(props.formId, statusCode));
            }
        }
        if (props.formId === FormId.LOGIN) {
            const {
                generic: {fieldValue: password},
                email: {fieldValue: email},
            } = props.formState as LoginType;

            if (checkFormValues(props.formState)) {
                userLogin(email, password)
                    .then(_ => goBack())
                    .catch(statusCode => promiseError(props.formId, statusCode));
            }
        }
        if (props.formId === FormId.ADDRESS) {
            if (checkFormValues(props.formState)) {
                userAddress(props.formState)
                    .then(_ => {
                            if (state === CheckoutRoute.TO_ADDRESS_UPDATE) {
                                push("/checkout/creditcard");
                                return;
                            }
                            push({
                                pathname: "/",
                            });
                        }
                    )
                    .catch(statusCode => promiseError(props.formId, statusCode));
            }
        }
    };

    return (
        <>
            <div className={styles.action_buttons}>
                <Button variant={"contained"} onClick={(_) => goBack()}>
                    Back
                </Button>
                <Button
                    type={"submit"}
                    form={props.formId}
                    onClick={submitForm}
                    variant={"contained"}
                    disabled={props.formValidity}
                    color={"secondary"}>
                    Go
                </Button>
            </div>
            {errorSnack}
        </>
    );
};
