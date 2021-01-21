import * as React from "react";
import {RefObject} from "react";
import {FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {errorStateTrigger} from "./FormStateManager";
import {useGenericFormValidation} from "./useGenericFormValidation";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";
import Cleave from "cleave.js";

const formatCVV = (value: string): string => {
    return value.replace(/\D+/g, "").slice(0, 3);
}

type CreditCardFormId = "username" | "cardnumber" | "cardvalidity" | "cvv";

type CreditCardFormState = FormState<CreditCardFormId>;

enum CreditCardActionTypes {
    BLANK_FIELD,
    CREDITCARD_NUMBER,
    CREDITCARD_VALIDITY,
    CVV
}

type FormActions = GenericFormActions<CreditCardFormId>
    | { type: CreditCardActionTypes.BLANK_FIELD, fieldId: CreditCardFormId }
    | { type: CreditCardActionTypes.CREDITCARD_NUMBER, value: string }
    | { type: CreditCardActionTypes.CREDITCARD_VALIDITY, value: string }
    | { type: CreditCardActionTypes.CVV, inputRef: RefObject<HTMLInputElement> }

const formReducer = (prevState: CreditCardFormState, action: FormActions): CreditCardFormState => {
    prevState = genericFormReducer(prevState, action as GenericFormActions<CreditCardFormId>);
    switch (action.type) {
        case CreditCardActionTypes.BLANK_FIELD:
            if (prevState[action.fieldId].fieldValue) {
                return {
                    ...prevState,
                    [action.fieldId]: {
                        ...prevState[action.fieldId],
                        requiredValidity: false,
                        submitButtonDisable: true
                    }
                };
            } else {
                return {
                    ...prevState,
                    [action.fieldId]: {
                        ...prevState[action.fieldId],
                        fieldValue: "",
                        requiredValidity: true,
                        submitButtonDisable: false
                    }
                };
            }
        case CreditCardActionTypes.CREDITCARD_NUMBER:
            return {
                ...prevState,
                cardnumber: {
                    ...prevState.cardnumber,
                    fieldValue: action.value
                }
            };
        case CreditCardActionTypes.CREDITCARD_VALIDITY:
            if (new RegExp(/^\d{2}\/\d{2}$/).test(action.value)) {
                return {
                    ...prevState,
                    cardvalidity: {
                        ...prevState.cardvalidity,
                        requiredValidity: false,
                        submitButtonDisable: true,
                        fieldValue: action.value
                    }
                };
            }
            return {
                ...prevState,
                cardvalidity: {
                    ...prevState.cardvalidity,
                    requiredValidity: true,
                    submitButtonDisable: false,
                    fieldValue: ""
                }
            };
        case CreditCardActionTypes.CVV:
            if (action.inputRef.current) {
                if (new RegExp(/\d{1,3}/).test(action.inputRef.current.value)) {
                    const cVVValue = formatCVV(action.inputRef.current.value);
                    action.inputRef.current.value = cVVValue;
                    const newState = {
                        ...prevState,
                        cvv: {
                            ...prevState.cvv,
                            fieldValue: cVVValue,
                            requiredValidity: false,
                            submitButtonDisable: true,
                        }
                    };
                    if (cVVValue.length !== 3) {
                        newState.cvv.requiredValidity = true;
                        newState.cvv.submitButtonDisable = false;
                        newState.cvv.fieldValue = "";
                    }
                    return newState;
                }
            }
            // Only display the form input if the user enter only numbers
            if (action.inputRef.current) {
                if (isNaN(parseInt(action.inputRef.current.value))) {
                    action.inputRef.current.value = "";
                }
            }
            return {
                ...prevState,
                cvv: {
                    ...prevState.cvv,
                    fieldValue: "",
                    requiredValidity: true,
                    submitButtonDisable: false
                }
            };
        default:
            return prevState;
    }
};

const initialFormState: CreditCardFormState = {
    username: {requiredValidity: false, submitButtonDisable: false},
    cardnumber: {requiredValidity: false, submitButtonDisable: false},
    cardvalidity: {requiredValidity: false, submitButtonDisable: false},
    cvv: {requiredValidity: false, submitButtonDisable: false},
};

type SimpleFormValidation = {
    validationState: {
        formState: CreditCardFormState,
        errorState: boolean
    },
    validationFunctions: {
        blankFieldValidation: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: CreditCardFormId) => void
        genericFieldValidation: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: CreditCardFormId) => void
        creditCardNumberValidation: (selector: string) => void,
        creditCardValidityValidation: (selector: string) => void,
        creditCardCVVValidation: (inputRef: RefObject<HTMLInputElement>) => void
    }
};

/**
 * Form validation to credit card
 */
export const useCreditCardFormValidation = (): SimpleFormValidation => {
    const [formState, formDispatch] = React.useReducer<React.Reducer<CreditCardFormState, FormActions>>(formReducer, initialFormState);
    const {genericFieldValidation} = useGenericFormValidation(formDispatch);
    const [errorState, setErrorState] = React.useState(true);

    React.useEffect(() => {
        setErrorState(_ => errorStateTrigger(formState));
    }, [formState]);

    const blankFieldValidation = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: CreditCardFormId): void => {
        formDispatch({type: CreditCardActionTypes.BLANK_FIELD, fieldId});
    }

    const creditCardCVVValidation = (inputRef: RefObject<HTMLInputElement>): void => {
        formDispatch({type: CreditCardActionTypes.CVV, inputRef});
    }

    const creditCardNumberValidation = (selector: string): void => {
        new Cleave(selector, {
            creditCard: true,
            onValueChanged(event: { target: { name: string, value: string, rawValue: string } }): void {
                formDispatch({type: CreditCardActionTypes.CREDITCARD_NUMBER, value: event.target.value});
            }
        });
    }

    const creditCardValidityValidation = (selector: string): void => {
        new Cleave(selector, {
            date: true,
            datePattern: ["m", "y"],
            onValueChanged(event: { target: { name: string, value: string, rawValue: string } }): void {
                formDispatch({type: CreditCardActionTypes.CREDITCARD_VALIDITY, value: event.target.value});
            }
        });
    }

    return {
        validationState: {
            formState,
            errorState
        },
        validationFunctions: {
            genericFieldValidation,
            blankFieldValidation,
            creditCardNumberValidation,
            creditCardValidityValidation,
            creditCardCVVValidation
        }
    };
};