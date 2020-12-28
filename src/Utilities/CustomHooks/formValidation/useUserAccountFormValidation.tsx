import * as React from "react";
import {FieldId, FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {emailExists} from "../../../HttpRequests/UserRequestManager";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

const initialFormState: FormState<FieldId> = {
    generic: {requiredValidity: false, submitButtonDisable: false},
    email: {requiredValidity: false, submitButtonDisable: false},
    password: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
    repeatPassword: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
};

enum ActionTypes {
    REQUIRED = "REQUIRED",
    GENERIC = "GENERIC",
    PASSWORD = "PASSWORD",
    REPEAT_PASSWORD = "REPEAT_PASSWORD",
}

type FormActions =
    { type: ActionTypes.REQUIRED, fieldId: FieldId, fieldValidity: boolean }
    | { type: ActionTypes.GENERIC, fieldValue: string }
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
                }
            };
        case ActionTypes.GENERIC:
            return {
                ...prevState,
                generic: {
                    ...prevState.generic,
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
        requiredValidation: (event: any, fieldId: any) => any,
        genericFieldValidation: (event: any, fieldId: any) => void,
        emailValidation: (event: any, formState: any, checkEmailExistence: boolean) => any,
        passwordValidation: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        repeatPasswordValidation: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        passwordHelperText: (formState: FormState<FieldId>) => string | null
    }
}

const errorStateTrigger = <T extends string>(formState: FormState<T>, omitFieldValidators?: T[], errorStateMiddleware?: (key: T, ...args: any[]) => FormState<T>): boolean => {
    for (const key in formState) {
        if (!omitFieldValidators?.includes(key as T)) {
            const newFormState = errorStateMiddleware ? errorStateMiddleware(key) : formState;
            if (!newFormState[(key as T)].submitButtonDisable) {
                return true;
            }
        }
    }
    return false;
}

export const useUserAccountFormValidation = (omitFieldValidators?: FieldId[]): UserFormValidationType => {
    const [formState, formDispatch] = React.useReducer<React.Reducer<FormState<FieldId>, FormActions>>(formReducer, initialFormState);
    const [emailState, setEmailState] = React.useState(initialFormState);
    const [errorState, setErrorState] = React.useState(true);

    React.useEffect(() => {
        setErrorState(_ => {
            return errorStateTrigger(formState, omitFieldValidators, (key) => {
                if (key === "email") formState.email = emailState.email;
                return formState;
            });
        });
    }, [formState, emailState, omitFieldValidators]);

    function emailValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<FieldId>, checkEmailExistence: boolean): void;
    function emailValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<FieldId>, checkEmailExistence: boolean): void;
    function emailValidation(event: any, formState: any, checkEmailExistence = true): void {
        if (event.target.checkValidity()) {
            if (checkEmailExistence) {
                emailExists(event.target.value)
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

    function requiredValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void;
    function requiredValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void;
    function requiredValidation(event: any, fieldId: any): any {
        formDispatch({
            fieldId,
            type: ActionTypes.REQUIRED,
            fieldValidity: event.target.checkValidity()
        });
    }

    /**
     * Encompasses the required validation plus the retrieval of it input value
     * @param event the onBlur event
     * @param fieldId the field id for requirement validation
     */
    function genericFieldValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void;
    function genericFieldValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: FieldId): void;
    function genericFieldValidation(event: any, fieldId: FieldId): void {
        requiredValidation(event, fieldId);
        formDispatch({type: ActionTypes.GENERIC, fieldValue: event.currentTarget.value});
    }

    // TODO: Verify the rightness of regular expression in the view of Javascript
    const passwordValidation = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        formDispatch({type: ActionTypes.PASSWORD, fieldValue: event.currentTarget.value});
    }

    const repeatPasswordValidation = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        formDispatch({type: ActionTypes.REPEAT_PASSWORD, fieldValue: event.currentTarget.value});
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
            genericFieldValidation,
            passwordValidation,
            passwordHelperText,
            repeatPasswordValidation
        }
    }
}