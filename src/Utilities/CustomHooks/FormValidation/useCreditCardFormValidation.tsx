import * as React from "react";
import {RefObject} from "react";
import {useGenericFormValidation} from "./useGenericFormValidation";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";
import {FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {errorStateTrigger} from "./FormStateManager";
import Cleave from "cleave.js";

const formatCVV = (value: string): string => {
    return value.replace(/\D+/g, "").slice(0, 4);
}

type CreditCardFormTypes = "username" | "cardnumber" | "cardvalidity" | "cvv"

type CreditCardFormState = FormState<CreditCardFormTypes>;

enum CreditCardActionTypes {
    CREDITCARD_NUMBER,
    CREDITCARD_VALIDITY,
    CVV
}

type FormActions = GenericFormActions<CreditCardFormTypes>
    | { type: CreditCardActionTypes.CREDITCARD_NUMBER, selector: string }
    | { type: CreditCardActionTypes.CREDITCARD_VALIDITY, selector: string }
    | { type: CreditCardActionTypes.CVV, inputRef: RefObject<HTMLInputElement> }

const formReducer = (prevState: CreditCardFormState, action: FormActions) => {
    prevState = genericFormReducer(prevState, action as GenericFormActions<CreditCardFormTypes>);
    switch (action.type) {
        case CreditCardActionTypes.CREDITCARD_NUMBER:
            const number = new Cleave(action.selector, {
                creditCard: true
            });
            return {
                ...prevState,
                cardnumber: {
                    ...prevState.cardnumber,
                    fieldValue: number.getRawValue()
                }
            };
        case CreditCardActionTypes.CREDITCARD_VALIDITY:
            const validity = new Cleave(action.selector, {
                date: true,
                datePattern: ["m", "y"]
            });
            return {
                ...prevState,
                cardvalidity: {
                    ...prevState.cardvalidity,
                    fieldValue: validity.getRawValue()
                }
            };
        case CreditCardActionTypes.CVV:
            if (action.inputRef.current) {
                if (new RegExp(/\d{1,4}/).test(action.inputRef.current.value)) {
                    const cVVValue = formatCVV(action.inputRef.current.value);
                    action.inputRef.current.value = cVVValue;
                    return {
                        ...prevState,
                        cvv: {
                            ...prevState.cvv,
                            requiredValidity: false,
                            fieldValue: cVVValue
                        }
                    };
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
                    requiredValidity: true
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
        genericFieldValidation: (event: any, fieldId: any) => void,
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

    const creditCardNumberValidation = (selector: string): void => {
        formDispatch({type: CreditCardActionTypes.CREDITCARD_NUMBER, selector});
    }

    const creditCardValidityValidation = (selector: string): void => {
        formDispatch({type: CreditCardActionTypes.CREDITCARD_VALIDITY, selector});
    }

    const creditCardCVVValidation = (inputRef: RefObject<HTMLInputElement>): void => {
        formDispatch({type: CreditCardActionTypes.CVV, inputRef});
    }

    return {
        validationState: {
            formState,
            errorState
        },
        validationFunctions: {
            genericFieldValidation,
            creditCardNumberValidation,
            creditCardValidityValidation,
            creditCardCVVValidation
        }
    };
};