import * as React from "react";
import {FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {errorStateTrigger} from "./FormStateManager";
import {useGenericFormValidation} from "./useGenericFormValidation";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";

type CreditCardFormId = "username";

type CreditCardFormState = FormState<CreditCardFormId>;

enum CreditCardActionTypes {
    BLANK_FIELD
}

type FormActions = GenericFormActions<CreditCardFormId>
    | { type: CreditCardActionTypes.BLANK_FIELD, fieldId: CreditCardFormId }

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
        default:
            return prevState;
    }
};

const initialFormState: CreditCardFormState = {
    username: {requiredValidity: false, submitButtonDisable: false},
};

type SimpleFormValidation = {
    validationState: {
        formState: CreditCardFormState,
        errorState: boolean
    },
    validationFunctions: {
        blankFieldValidation: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: CreditCardFormId) => void
        genericFieldValidation: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: CreditCardFormId) => void
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

    return {
        validationState: {
            formState,
            errorState
        },
        validationFunctions: {
            genericFieldValidation,
            blankFieldValidation,
        }
    };
};