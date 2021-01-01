import * as React from "react";
import styles from "../UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";
import {UserSnackbar} from "./UserSnackbar";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {FormId, FormState, UserFormButtonProps} from "../UserFormsTypes/UserFormsTypes";
import {MessageStateProps} from "./UserActionTypes";

const checkFormValues = (formObj: FormState<any>): boolean => {
    for (const key in formObj) {
        if (formObj.hasOwnProperty(key) && formObj[key].fieldValue) {
            return true;
        }
    }
    return false;
}

type SignupType = Record<"email" | "password" | "generic", { fieldValue: string }>;
type LoginType = Record<"generic" | "email", { fieldValue: string }>;

export const UserActionButton: React.FunctionComponent<UserFormButtonProps> = props => {
    const message = React.useRef<MessageStateProps>({message: "", messageStateCount: 0});
    const [userSnack, setUserSnack] = React.useState<JSX.Element | null>(null);
    const {registerUser, userLogin, userAddress} = React.useContext(AuthContext);
    const {goBack, push} = useHistory();

    const promiseError = React.useCallback((errorMessage: string) => {
        setUserSnack(_ => {
            message.current = {
                message: errorMessage,
                messageStateCount: message.current.messageStateCount === 0 ? 1 : 0
            };
            return <UserSnackbar {...message.current}/>
        });
    }, []);

    const submitForm: React.MouseEventHandler = event => {
        if (props.formId === FormId.SIGNUP) {
            const {
                email: {fieldValue: email},
                password: {fieldValue: password},
                generic: {fieldValue: username}
            } = (props.formState as SignupType);

            if (checkFormValues(props.formState)) {
                registerUser(username, email, password)
                    .then(_ => {
                        push({
                            pathname: "/user/address"
                        })
                    })
                    .catch(promiseError);
            }
        }
        if (props.formId === FormId.LOGIN) {
            const {
                generic: {fieldValue: password},
                email: {fieldValue: email}
            } = (props.formState as LoginType);

            if (checkFormValues(props.formState)) {
                userLogin(email, password)
                    .then(_ => {
                        push({
                            pathname: "/"
                        });
                    })
                    .catch(promiseError);
            }
        }
        if (props.formId === FormId.ADDRESS) {
            if (checkFormValues(props.formState)) {
                userAddress(props.formState)
                    .then(_ => push({
                        pathname: "/"
                    }))
                    .catch(promiseError);
            }
        }
    }

    return (
        <>
            <div className={styles.action_buttons}>
                <Button variant={"contained"} onClick={_ => goBack()}>Back</Button>
                <Button
                    type={"submit"}
                    form={props.formId}
                    onClick={submitForm}
                    variant={"contained"}
                    disabled={props.formValidity}
                    color={"secondary"}>Go</Button>
            </div>
            {userSnack}
        </>
    );
}