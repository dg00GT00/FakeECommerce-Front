import * as React from "react";
import {TextField, Tooltip} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {ErrorState, FieldId, FormState} from "../UserFormsTypes/UserFormsTypes";
import {UserFormButton} from "../UserFormButton";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"

const initialFormState: FormState<FieldId> = {
    username: {requiredValidity: false},
    email: {requiredValidity: false},
    password: {requiredValidity: false, patternValidity: false},
    repeatPassword: {requiredValidity: false, patternValidity: false},
};

const initialErrorState: ErrorState = {
    email: false,
    password: false,
    username: false,
    repeatPassword: false
}

// Pa$$word1

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {

    const {formId, showRequiredLabel, ...inputProps} = props;
    const [formState, setFormState] = React.useState<FormState<FieldId>>(initialFormState);
    const [errorState, setErrorState] = React.useState(true);
    const errorObj = React.useRef(initialErrorState);
    const [passwordState, setPasswordState] = React.useState("");

    React.useEffect(() => {
        setErrorState(_ => {
            for (const key in errorObj.current) {
                if (!initialErrorState[(key as FieldId)]) {
                    return true;
                }
            }
            return false;
        })
    }, [formState]);

    const requireValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => {
        let newState: FormState<FieldId>;
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            const requiredValidity = event.target.checkValidity();
            newState = {
                ...state,
                [fieldId]: {
                    ...state[fieldId],
                    requiredValidity: !requiredValidity
                }
            }
            errorObj.current[fieldId] = requiredValidity;
            return newState;
        });
    }

    const passwordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => {
        let newState: FormState<FieldId>;
        setPasswordState(prevPass => {
            let passState = prevPass ?? passwordState;
            setFormState(prevFormState => {
                const state = prevFormState ?? formState;
                if (new RegExp(passwordRegex).test(event.target.value)) {
                    newState = {
                        ...state,
                        [fieldId]: {
                            ...state[fieldId],
                            patternValidity: false
                        }
                    }
                } else {
                    newState = {
                        ...state,
                        [fieldId]: {
                            ...state[fieldId],
                            patternValidity: true
                        }
                    }
                }
                if (passState !== event.target.value) {
                    newState.repeatPassword.patternValidity = true;
                    errorObj.current.repeatPassword = false;
                }
                passState = event.target.value;
                errorObj.current[fieldId] = !newState[fieldId].patternValidity as boolean
                console.log(newState);
                return newState;
            });
            return passState;
        });
    }

    const repeatPasswordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => {
        let newState: FormState<FieldId>;
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            if (event.target.value !== passwordState || event.target.value === "") {
                newState = {
                    ...state,
                    [fieldId]: {
                        ...state[fieldId],
                        patternValidity: true
                    }
                }
            } else {
                newState = {
                    ...state,
                    [fieldId]: {
                        ...state[fieldId],
                        patternValidity: false
                    }
                }
            }
            errorObj.current[fieldId] = !newState[fieldId].patternValidity as boolean;
            return newState;
        });
    }

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
                       onBlur={event => requireValidation(event, "username")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.username.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
            <TextField color={"primary"}
                       error={formState.email.requiredValidity}
                       fullWidth
                       required
                       id="email"
                       label="Email"
                       type="email"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => requireValidation(event, "email")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.email.requiredValidity ? "* this field is required" : null}
                       {...inputProps}/>
            <Tooltip
                title={"Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 characters"}
                disableHoverListener
                arrow>
                <TextField color={"primary"}
                           error={formState.password.patternValidity}
                           required
                           id="password"
                           label="Password"
                           type="password"
                           variant="outlined"
                           size={"small"}
                           fullWidth
                           onChange={event => passwordValidation(event, "password")}
                           FormHelperTextProps={{error: true}}
                           helperText={formState.password.patternValidity ? "* this password is invalid" : null}
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
                       onChange={event => repeatPasswordValidation(event, "repeatPassword")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.repeatPassword.patternValidity ? "* the passwords are not equal" : null}
                       {...inputProps}/>
            {showRequiredLabel ? <p>* fields required</p> : null}
            <UserFormButton formId={formId} formValidity={errorState}/>
        </>
    );
}