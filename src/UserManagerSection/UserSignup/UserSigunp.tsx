import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {FieldId, FormState} from "../UserFormsTypes/UserFormsTypes";
import {UserFormButton} from "../UserFormButton";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"

const initialFormState: FormState<FieldId> = {
    username: {requiredValidity: false, submitButtonDisable: false},
    email: {requiredValidity: false, submitButtonDisable: false},
    password: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
    repeatPassword: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
};

const userAccount = new UserRequestManager();

enum ActionTypes {
    REQUIRED = "REQUIRED",
    PASSWORD = "PASSWORD",
    REPEAT_PASSWORD = "REPEAT_PASSWORD",
}

type FormActions =
    { type: ActionTypes.REQUIRED, fieldId: FieldId, fieldValidity: boolean }
    | { type: ActionTypes.PASSWORD, fieldValue: string }
    | { type: ActionTypes.REPEAT_PASSWORD, fieldValue: string }


const formReducer = (prevState: FormState<FieldId>, action: FormActions): FormState<FieldId> => {
    let newState: FormState<FieldId>;
    switch (action.type) {
        case ActionTypes.REQUIRED:
            return {
                ...prevState,
                [action.fieldId]: {
                    ...prevState[action.fieldId],
                    requiredValidity: !action.fieldValidity,
                    submitButtonDisable: action.fieldValidity
                }
            };
        case ActionTypes.PASSWORD:
            if (new RegExp(passwordRegex).test(action.fieldValue)) {
                newState = {
                    ...prevState,
                    password: {
                        ...prevState.password,
                        patternValidity: false,
                        requiredValidity: false,
                        submitButtonDisable: true
                    }
                }
            } else {
                newState = {
                    ...prevState,
                    password: {
                        ...prevState.password,
                        patternValidity: true,
                        submitButtonDisable: false
                    }
                }
                if (action.fieldValue === "") {
                    newState.password.patternValidity = false;
                    newState.password.requiredValidity = true;
                }
            }
            if (prevState.repeatPassword.fieldValue !== action.fieldValue) {
                newState.repeatPassword.patternValidity = true;
                newState.repeatPassword.submitButtonDisable = false;
            } else {
                newState.repeatPassword.patternValidity = false;
                newState.repeatPassword.submitButtonDisable = true;
            }
            newState.password.fieldValue = action.fieldValue;
            return newState;
        case ActionTypes.REPEAT_PASSWORD:
            if (action.fieldValue !== prevState.password.fieldValue || action.fieldValue === "") {
                newState = {
                    ...prevState,
                    repeatPassword: {
                        ...prevState.repeatPassword,
                        patternValidity: true,
                        submitButtonDisable: false
                    }
                }
            } else {
                newState = {
                    ...prevState,
                    repeatPassword: {
                        ...prevState.repeatPassword,
                        patternValidity: false,
                        submitButtonDisable: true
                    }
                }
            }
            newState.repeatPassword.fieldValue = action.fieldValue;
            return newState;
        default:
            return initialFormState;
    }
}


export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {

    const {formId, showRequiredLabel, ...inputProps} = props;
    const [formState, formDispatch] = React.useReducer<React.Reducer<FormState<FieldId>, FormActions>>(formReducer, initialFormState);
    const [emailState, setEmailState] = React.useState(initialFormState);
    const [errorState, setErrorState] = React.useState(true);

    React.useEffect(() => {
        setErrorState(_ => {
            for (const key in formState) {
                if (key === "email") formState.email = emailState.email;
                if (!formState[(key as FieldId)].submitButtonDisable) {
                    return true;
                }
            }
            return false;
        })
    }, [formState, emailState]);

    const emailValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<FieldId>) => {
        if (event.target.checkValidity()) {
            userAccount
                .emailExists(event.target.value)
                .then(email => {
                    if (email) {
                        event.target.value = "This email already exists";
                        setEmailState(_ => {
                            return {
                                ...formState,
                                email: {
                                    ...formState.email,
                                    requiredValidity: true,
                                    submitButtonDisable: false
                                }
                            }
                        });
                    } else {
                        setEmailState(_ => {
                            return {
                                ...formState,
                                email: {
                                    ...formState.email,
                                    requiredValidity: false,
                                    submitButtonDisable: true
                                }
                            }
                        });
                    }
                })
                .catch(_ => {
                    event.target.value = "Inconsistency on the server. Try again";
                    setEmailState(_ => {
                        return {
                            ...formState,
                            email: {
                                ...formState.email,
                                requiredValidity: true,
                                submitButtonDisable: false
                            }
                        }
                    });
                });
        } else {
            setEmailState(_ => {
                return {
                    ...formState,
                    email: {
                        ...formState.email,
                        requiredValidity: true,
                        submitButtonDisable: false
                    }
                }
            });
        }
    }
    const requiredValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => {
        formDispatch({type: ActionTypes.REQUIRED, fieldId, fieldValidity: event.target.checkValidity()});
    }

    const passwordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        formDispatch({type: ActionTypes.PASSWORD, fieldValue: event.target.value});
    }

    const repeatPasswordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        formDispatch({type: ActionTypes.REPEAT_PASSWORD, fieldValue: event.target.value});
    }

    const passwordHelperText = (formState: FormState<FieldId>): string | null => {
        let message: string | null = null;
        if (formState.password.requiredValidity) {
            message = "* this field is required";
        }
        if (formState.password.patternValidity) {
            message = "* this password is invalid";
        }
        return message;
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
                       onBlur={event => requiredValidation(event, "username")}
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
            <UserFormButton formId={formId} formValidity={errorState}/>
        </>
    );
}