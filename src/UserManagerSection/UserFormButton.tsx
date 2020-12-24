import * as React from "react";
import styles from "./UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";
import {FormId, UserFormButtonProps} from "./UserFormsTypes/UserFormsTypes";
import {AuthContext} from "../Utilities/Context/AuthContext";

export const UserFormButton: React.FunctionComponent<UserFormButtonProps> = props => {
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
                    .then(_ => push({
                        pathname: "/"
                    }))
                    .catch(error => {
                        push({
                            pathname: "/notfound"
                        })
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
                    .then(_ => push({
                        pathname: "/"
                    }))
                    .catch(error => {
                        push({
                            pathname: "/notfound"
                        })
                    });
            }
        }
    }

    return (
        <div className={styles.action_buttons}>
            <Button variant={"contained"} onClick={_ => goBack()}>Back</Button>
            <Button
                type={"submit"}
                form={props.formId}
                variant={"contained"}
                disabled={props.formValidity}
                onClick={submitForm}
                color={"secondary"}>Go</Button>
        </div>
    )
}