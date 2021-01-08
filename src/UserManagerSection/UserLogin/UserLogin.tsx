import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {NavLink} from "react-router-dom";
import {UserActionButton} from "../UserActions/UserActionButton";
import {useUserAccountFormValidation} from "../../Utilities/CustomHooks/FormValidation/useUserAccountFormValidation";
import styles from "./UserLogin.module.scss";


export const UserLogin: React.FunctionComponent<UserInputTypes> = props => {
    const {formId, showRequiredLabel, ...inputProps} = props;
    const {
        validationState: {errorState, formState, emailState},
        validationFunctions: {emailValidation, genericFieldValidation, formHelperText}
    } = useUserAccountFormValidation(["repeatPassword", "password"]);

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
                       onBlur={event => emailValidation(event, formState, false)}
                       onChange={event => emailValidation(event, formState, false)}
                       FormHelperTextProps={{error: true}}
                       helperText={emailState.email.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
            <TextField color={"primary"}
                       error={formState.generic.requiredValidity}
                       required
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       onBlur={event => genericFieldValidation(event, "generic")}
                       onChange={event => genericFieldValidation(event, "generic")}
                       FormHelperTextProps={{error: true}}
                       helperText={formHelperText(formState, "generic")}
                       {...inputProps}/>
            <NavLink to={"/user/signup"} className={styles.no_account}>Have no account?</NavLink>
            <UserActionButton formId={formId} formValidity={errorState} formState={formState}/>
        </>
    )
}