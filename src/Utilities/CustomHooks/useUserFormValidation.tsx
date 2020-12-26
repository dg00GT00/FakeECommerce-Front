import * as React from "react";
import {FieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

const initialFormState: FormState<FieldId> = {
    username: {requiredValidity: false, submitButtonDisable: false},
    email: {requiredValidity: false, submitButtonDisable: false},
    password: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
    repeatPassword: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
};

const userAccount = new UserRequestManager();

enum ActionTypes {
    REQUIRED = "REQUIRED",
    USER_NAME = "USER_NAME",
    PASSWORD = "PASSWORD",
    REPEAT_PASSWORD = "REPEAT_PASSWORD",
}

type FormActions =
    { type: ActionTypes.REQUIRED, fieldValue: string, fieldId: FieldId, fieldValidity: boolean }
    | { type: ActionTypes.USER_NAME, fieldValue: string }
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
                    submitButtonDisable: action.fieldValidity,
                    fieldValue: action.fieldValue
                }
            };
        case ActionTypes.USER_NAME:
            return {
                ...prevState,
                username: {
                    ...prevState.username,
                    fieldValue: action.fieldValue
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
            if (action.fieldValue !== prevState.password.fieldValue) {
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

type UserFormValidationType = {
    validationState: {
        errorState: boolean,
        emailState: FormState<FieldId>,
        formState: FormState<FieldId>
    },
    validationFunctions: {
        emailValidation: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<FieldId>) => void,
        userNameValidation: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => void,
        requiredValidation: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId) => void,
        passwordValidation: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        repeatPasswordValidation: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        passwordHelperText: (formState: FormState<FieldId>) => string | null
    }
}

export const useUserFormValidation = (omitFieldValidators?: FieldId[], checkEmailExistence = true): UserFormValidationType => {
    const [formState, formDispatch] = React.useReducer<React.Reducer<FormState<FieldId>, FormActions>>(formReducer, initialFormState);
    const [emailState, setEmailState] = React.useState(initialFormState);
    const [errorState, setErrorState] = React.useState(true);

    React.useEffect(() => {
        setErrorState(_ => {
            for (const key in formState) {
                if (!omitFieldValidators?.includes(key as FieldId)) {
                    if (key === "email") formState.email = emailState.email;
                    if (!formState[(key as FieldId)].submitButtonDisable) {
                        return true;
                    }
                }
            }
            return false;
        });
    }, [formState, emailState, omitFieldValidators]);

    const emailValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<FieldId>): void => {
        if (event.target.checkValidity()) {
            if (checkEmailExistence) {
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
                                        submitButtonDisable: true,
                                        fieldValue: event.target.value
                                    }
                                }
                            });
                        }
                    })
                    .catch(_ => {
                        event.target.value = "Error on the server. Try again";
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
                            requiredValidity: false,
                            submitButtonDisable: true,
                            fieldValue: event.target.value
                        }
                    }
                });
            }
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
    const requiredValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void => {
        formDispatch({
            type: ActionTypes.REQUIRED,
            fieldValue: event.target.value,
            fieldId,
            fieldValidity: event.target.checkValidity()
        });
    }

    const userNameValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void => {
        requiredValidation(event, fieldId);
        formDispatch({type: ActionTypes.USER_NAME, fieldValue: event.target.value});
    }

    const passwordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        formDispatch({type: ActionTypes.PASSWORD, fieldValue: event.target.value});
    }

    const repeatPasswordValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

    return {
        validationState: {
            errorState,
            emailState,
            formState
        },
        validationFunctions: {
            emailValidation,
            requiredValidation,
            userNameValidation,
            passwordValidation,
            passwordHelperText,
            repeatPasswordValidation
        }
    }
}