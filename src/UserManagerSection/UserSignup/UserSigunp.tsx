import * as React from "react";
import {TextField, Tooltip} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"

type FormId = "username" | "email" | "password" | "repeatPassword";

type FormState = Record<FormId, { requiredError: boolean, patternError?: boolean }>;

const initialFormState: FormState = {
    username: {requiredError: false},
    email: {requiredError: false},
    password: {requiredError: false, patternError: false},
    repeatPassword: {requiredError: false, patternError: false},
};

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {
    const [formState, setFormState] = React.useState<FormState>(initialFormState);
    const password = React.useRef("");

    const requireValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formId: FormId) => {
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            const requiredError = !event.target.checkValidity();
            return {
                ...state,
                [formId]: {
                    ...state[formId],
                    requiredError
                }
            }
        });
    }

    const passwordValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formId: FormId) => {
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            let newState: FormState;
            if (new RegExp(passwordRegex).test(event.target.value)) {
                newState = {
                    ...state,
                    [formId]: {
                        ...state[formId],
                        patternError: false
                    }
                }
            } else {
                newState = {
                    ...state,
                    [formId]: {
                        ...state[formId],
                        patternError: true
                    }
                }
            }
            password.current = event.target.value;
            return newState;
        });
    }

    const repeatPasswordValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formId: FormId) => {
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            if (event.target.value !== password.current) {
                return {
                    ...state,
                    [formId]: {
                        ...state[formId],
                        patternError: true
                    }
                }
            } else {
                return {
                    ...state,
                    [formId]: {
                        ...state[formId],
                        patternError: false
                    }
                }
            }
        });
    }

    return (
        <>
            <TextField color={"primary"}
                       error={formState.username.requiredError}
                       fullWidth
                       required
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => requireValidation(event, "username")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.username.requiredError ? "* this field is required" : null}
                       {...props}/>
            <TextField color={"primary"}
                       error={formState.email.requiredError}
                       fullWidth
                       required
                       id="email"
                       label="Email"
                       type="email"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => requireValidation(event, "email")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.email.requiredError ? "* this field is required" : null}
                       {...props}/>
            <Tooltip
                title={"Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 characters"}
                disableHoverListener
                arrow>
                <TextField color={"primary"}
                           error={formState.password.patternError}
                           required
                           id="password"
                           label="Password"
                           type="password"
                           variant="outlined"
                           size={"small"}
                           fullWidth
                           onBlur={event => passwordValidation(event, "password")}
                           FormHelperTextProps={{error: true}}
                           helperText={formState.password.patternError ? "* this password is invalid" : null}
                           {...props}/>
            </Tooltip>
            <TextField color={"primary"}
                       error={formState.repeatPassword.patternError}
                       id="repeat-password"
                       label="Repeat Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       required
                       onBlur={event => repeatPasswordValidation(event, "repeatPassword")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.repeatPassword.patternError ? "* the password are not equal" : null}
                       {...props}/>
        </>
    );
}