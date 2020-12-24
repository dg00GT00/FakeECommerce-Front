import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {NavLink} from "react-router-dom";
import styles from "./UserLogin.module.scss";
import {UserFormButton} from "../UserFormButton";
import {useUserFormValidation} from "../../Utilities/CustomHooks/useUserFormValidation";


export const UserLogin: React.FunctionComponent<UserInputTypes> = props => {
    const {formId, showRequiredLabel, ...inputProps} = props;
    const {
        validationFunctions: {emailValidation, passwordValidation, requiredValidation, passwordHelperText},
        validationState: {errorState, formState, emailState}
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
                       FormHelperTextProps={{error: true}}
                       helperText={emailState.email.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
            <TextField color={"primary"}
                       error={formState.password.requiredValidity || formState.password.patternValidity}
                       required
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       onChange={passwordValidation}
                       onBlur={event => requiredValidation(event, "password")}
                       FormHelperTextProps={{error: true}}
                       helperText={passwordHelperText(formState)}
                       {...inputProps}/>
            <NavLink to={"/user/signup"} className={styles.forgot_password}>Have no account?</NavLink>
            <UserFormButton formId={formId} formValidity={errorState} formState={formState}/>
        </>
    )
}