import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {UserFormButton} from "../UserFormButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {useUserFormValidation} from "../../Utilities/CustomHooks/useUserFormValidation";

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {

    const {formId, showRequiredLabel, ...inputProps} = props;
    const {validationFunctions: {
        emailValidation,
        passwordHelperText,
        passwordValidation,
        repeatPasswordValidation,
        requiredValidation,
        userNameValidation
    }, validationState: {
        errorState,
        emailState,
        formState
    }} = useUserFormValidation();

    return (
        <>
            <TextField color={"primary"}
                       error={formState.username.requiredValidity}
                       fullWidth
                       required
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => userNameValidation(event, "username")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.username.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
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
            <Tooltip
                title={"Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 characters"}
                disableHoverListener
                arrow>
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
            </Tooltip>
            <TextField color={"primary"}
                       error={formState.repeatPassword.patternValidity}
                       id="repeat-password"
                       label="Repeat Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       required
                       onChange={repeatPasswordValidation}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.repeatPassword.patternValidity ? "* the passwords are not equal" : null}
                       {...inputProps}/>
            {showRequiredLabel ? <p>* fields required</p> : null}
            <UserFormButton formId={formId} formValidity={errorState} formState={formState}/>
        </>
    );
}