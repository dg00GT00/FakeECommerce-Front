import * as React from "react";
import styles from "../UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {MessageState} from "./UserActionTypes";
import {useHistory} from "react-router-dom";
import {UserSnackbar} from "./UserSnackbar";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {FormId, UserFormButtonProps} from "../UserFormsTypes/UserFormsTypes";

export const UserFormButton: React.FunctionComponent<UserFormButtonProps> = props => {
    const [message, setMessage] = React.useState<MessageState>({message: undefined, stateCount: 0});
    const {registerUser, userLogin} = React.useContext(AuthContext);
    const {goBack, push} = useHistory();


    const submitForm: React.MouseEventHandler = event => {
        if (props.formId === FormId.SIGNUP) {
            const {
                email: {fieldValue: email},
                password: {fieldValue: password},
                username: {fieldValue: username}
            } = props.formState;
            if (username && email && password) {
                registerUser(username, email, password)
                    .then(_ => {
                        push({
                            pathname: "/"
                        })
                    })
                    .catch(error => {
                        setMessage(prevState => {
                            const state = prevState ?? message;
                            return {
                                ...state,
                                message: error,
                                stateCount: state.stateCount === 0 ? 1 : 0
                            }
                        });
                    });
            }
        }
        if (props.formId === FormId.LOGIN) {
            const {
                password: {fieldValue: password},
                email: {fieldValue: email}
            } = props.formState;
            if (email && password) {
                userLogin(email, password)
                    .then(_ => {
                        push({
                            pathname: "/"
                        });
                    })
                    .catch(error => {
                        setMessage(prevState => {
                            const state = prevState ?? message;
                            return {
                                ...state,
                                message: error,
                                stateCount: state.stateCount === 0 ? 1 : 0
                            }
                        });
                    });
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
            <UserSnackbar {...message}/>
        </>
    );
}