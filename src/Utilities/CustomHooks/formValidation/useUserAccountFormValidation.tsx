import * as React from "react";
import {AccountFieldId, FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {emailExists} from "../../../HttpRequests/UserRequestManager";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";
import {ActionTypes} from "./FormActionTypes";
import {errorStateTrigger} from "./FormStateManager";
import {useGenericFormValidation} from "./useGenericFormValidation";

const passwordRegex = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

const initialFormState: FormState<AccountFieldId> = {
    generic: {requiredValidity: false, submitButtonDisable: false},
    email: {requiredValidity: false, submitButtonDisable: false},
    password: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
    repeatPassword: {requiredValidity: false, patternValidity: false, submitButtonDisable: false},
};

type FormActions = GenericFormActions<AccountFieldId>
    | { type: ActionTypes.PASSWORD, fieldValue: string }
    | { type: ActionTypes.REPEAT_PASSWORD, fieldValue: string };

/**
 * @return must return at least the generic state come from the generic reducer
 */
const formReducer = (prevState: FormState<AccountFieldId>, action: FormActions): FormState<AccountFieldId> => {
    prevState = genericFormReducer(prevState, (action as GenericFormActions<AccountFieldId>));
    let newState: FormState<AccountFieldId>;
    switch (action.type) {
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
            return prevState;
    }
}

type UserAccountValidation = {
    validationState: {
        errorState: boolean,
        emailState: FormState<AccountFieldId>,
        formState: FormState<AccountFieldId>
    },
    validationFunctions: {
        requiredValidation: (event: any, fieldId: any) => any,
        genericFieldValidation: (event: any, fieldId: any) => void,
        emailValidation: (event: any, formState: any, checkEmailExistence: boolean) => any,
        passwordValidation: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        repeatPasswordValidation: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
        formHelperText: (formState: FormState<AccountFieldId>, fieldId: AccountFieldId) => string | null
    }
}

export const useUserAccountFormValidation = (omitFieldValidators?: AccountFieldId[]): UserAccountValidation => {
    const [formState, formDispatch] = React.useReducer<React.Reducer<FormState<AccountFieldId>, FormActions>>(formReducer, initialFormState);
    const {genericFieldValidation, requiredValidation} = useGenericFormValidation(formDispatch);
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

    // TODO: Verify the rightness of regular expression in the view of Javascript
    const passwordValidation = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        formDispatch({type: ActionTypes.PASSWORD, fieldValue: event.currentTarget.value});
    }

    const repeatPasswordValidation = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        formDispatch({type: ActionTypes.REPEAT_PASSWORD, fieldValue: event.currentTarget.value});
    }

    function emailValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<AccountFieldId>, checkEmailExistence: boolean): void;
    function emailValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formState: FormState<AccountFieldId>, checkEmailExistence: boolean): void;
    function emailValidation(event: any, formState: any, checkEmailExistence: boolean): void {
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


    const formHelperText = (formState: FormState<AccountFieldId>, fieldId: AccountFieldId): string | null => {
        let message: string | null = null;
        if (formState[fieldId].requiredValidity) {
            message = "* this field is required";
        }
        if (formState[fieldId].patternValidity) {
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
            formHelperText,
            repeatPasswordValidation
        }
    }
}