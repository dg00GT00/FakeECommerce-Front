import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {UserActionButton} from "../UserActions/UserActionButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {useUserAccountFormValidation} from "../../Utilities/CustomHooks/formValidation/useUserAccountFormValidation";

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {

    const {formId, showRequiredLabel, ...inputProps} = props;
    const {validationFunctions: {
        emailValidation,
        formHelperText,
        passwordValidation,
        repeatPasswordValidation,
        requiredValidation,
        genericFieldValidation
    }, validationState: {
        errorState,
        emailState,
        formState
    }} = useUserAccountFormValidation();

    return (
        <>
            <TextField color={"primary"}
                       error={formState.generic.requiredValidity}
                       fullWidth
                       required
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => genericFieldValidation(event, "generic")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.generic.requiredValidity ? "* this field is required" : null}
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
                       onBlur={event => emailValidation(event, formState, true)}
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
                           helperText={formHelperText(formState, "password")}
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
            <UserActionButton formId={formId} formValidity={errorState} formState={formState}/>
        </>
    );
}