import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {NavLink} from "react-router-dom";
import {UserFormButton} from "../UserActions/UserFormButton";
import {useUserFormValidation} from "../../Utilities/CustomHooks/useUserFormValidation";
import styles from "./UserLogin.module.scss";


export const UserLogin: React.FunctionComponent<UserInputTypes> = props => {
    const {formId, showRequiredLabel, ...inputProps} = props;
    const {
        validationState: {errorState, formState, emailState},
        validationFunctions: {emailValidation, requiredValidation, passwordHelperText}
    } = useUserFormValidation(["username", "repeatPassword"], false);

    return (
        <>
            <TextField color={"primary"}
                       error={emailState.email.requiredValidity}
                       fullWidth
                       required
                       id="email"
                       label="Email"
                       type="email"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => emailValidation(event, formState)}
                       onChange={event => emailValidation(event, formState)}
                       FormHelperTextProps={{error: true}}
                       helperText={emailState.email.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
            <TextField color={"primary"}
                       error={formState.password.requiredValidity}
                       required
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       onBlur={event => requiredValidation(event, "password")}
                       onChange={event => requiredValidation(event, "password")}
                       FormHelperTextProps={{error: true}}
                       helperText={passwordHelperText(formState)}
                       {...inputProps}/>
            <NavLink to={"/user/signup"} className={styles.no_account}>Have no account?</NavLink>
            <UserFormButton formId={formId} formValidity={errorState} formState={formState}/>
        </>
    )
}