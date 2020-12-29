import * as React from "react";
import styles from "../UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {MessageState} from "./UserActionTypes";
import {useHistory} from "react-router-dom";
import {UserSnackbar} from "./UserSnackbar";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {FormId, UserFormButtonProps} from "../UserFormsTypes/UserFormsTypes";

export const UserActionButton: React.FunctionComponent<UserFormButtonProps> = props => {
    const [messageState, setMessageState] = React.useState<MessageState>({message: undefined, stateCount: 0});
    const {registerUser, userLogin} = React.useContext(AuthContext);
    const {goBack, push} = useHistory();


    const submitForm: React.MouseEventHandler = event => {
        if (props.formId === FormId.SIGNUP) {
            const {
                email: {fieldValue: email},
                password: {fieldValue: password},
                generic: {fieldValue: username}
            } = props.formState;
            if (username && email && password) {
                registerUser(username, email, password)
                    .then(_ => {
                        push({
                            pathname: "/user/address"
                        })
                    })
                    .catch(error => {
                        setMessageState(prevState => {
                            const state = prevState ?? messageState;
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
                generic: {fieldValue: password},
                email: {fieldValue: email}
            } = props.formState;
            console.log(props.formState);
            if (email && password) {
                userLogin(email, password)
                    .then(_ => {
                        push({
                            pathname: "/"
                        });
                    })
                    .catch(error => {
                        setMessageState(prevState => {
                            const state = prevState ?? messageState;
                            return {
                                ...state,
                                message: error,
                                stateCount: state.stateCount === 0 ? 1 : 0
                            }
                        });
                    });
            }
        }
        if (props.formId === FormId.ADDRESS) {
            const {
                city: {fieldValue: city},
                state: {fieldValue: state},
                country: {fieldValue: country},
                zipcode: {fieldValue: zipcode},
                complement: {fieldValue: complement},
                street: {fieldValue: street}
            } = props.formState;
            if (city && state && country && zipcode && complement && street) {

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
            <UserSnackbar {...messageState}/>
        </>
    );
}