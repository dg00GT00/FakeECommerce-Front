import * as React from "react";
import styles from "./UserCard/UserCard.module.scss";
import Button from "@material-ui/core/Button/Button";
import {useHistory} from "react-router-dom";

export const UserFormButton: React.FunctionComponent<{ formId: string, formValidity: boolean }> = props => {
    const {goBack} = useHistory();

    const onSubmit: React.FormEventHandler = event => {
        console.log("clicked");
    }

    return (
        <div className={styles.action_buttons}>
            <Button variant={"contained"} onClick={_ => goBack()}>Back</Button>
            <Button
                type={"submit"}
                form={props.formId}
                variant={"contained"}
                disabled={props.formValidity}
                onClick={onSubmit}
                color={"secondary"}>Go</Button>
        </div>
    )
}