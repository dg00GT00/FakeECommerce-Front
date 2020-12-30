import * as React from "react";
import {AddressFieldId, FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {useGenericFormValidation} from "./useGenericFormValidation";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";
import {errorStateTrigger} from "./FormStateManager";
import {ActionTypes} from "./FormActionTypes";

type AddressFormActions =
    | GenericFormActions<AddressFieldId>
    | { type: ActionTypes.RESET, newFormState: FormState<AddressFieldId> }

type AddressReducer = React.Reducer<FormState<AddressFieldId>, AddressFormActions>;

type AddressFormType = {
    validationFunctions: {
        requiredValidation: (event: any, fieldId: any) => any,
        genericFieldValidation: (event: any, fieldId: any) => void
    },
    validationState: {
        errorState: boolean,
        addressFormReducer: [FormState<AddressFieldId>, React.Dispatch<AddressFormActions>]
    }
}

const initialFormState: FormState<AddressFieldId> = {
    complement: {requiredValidity: false, submitButtonDisable: false},
    state: {requiredValidity: false, submitButtonDisable: false},
    city: {requiredValidity: false, submitButtonDisable: false},
    country: {requiredValidity: false, submitButtonDisable: false},
    street: {requiredValidity: false, submitButtonDisable: false},
    zipcode: {requiredValidity: false, submitButtonDisable: false},
    firstName: {requiredValidity: false, submitButtonDisable: false},
    lastName: {requiredValidity: false, submitButtonDisable: false}
}

const addressFormReducer = (prevState: FormState<AddressFieldId>, actions: AddressFormActions): FormState<AddressFieldId> => {
    prevState = genericFormReducer(prevState, actions as GenericFormActions<AddressFieldId>);
    switch (actions.type) {
        case ActionTypes.RESET:
            for (const key in actions.newFormState) {
                actions.newFormState[key as AddressFieldId].fieldValueFromApi = true;
            }
            return actions.newFormState;
        default:
            return prevState;
    }
}

export const useAddressFormValidation = (omitFieldValidation: AddressFieldId[]): AddressFormType => {
    const [errorState, setErrorState] = React.useState(true);
    const [formState, formDispatch] = React.useReducer<AddressReducer>(addressFormReducer, initialFormState);
    const {genericFieldValidation, requiredValidation} = useGenericFormValidation(formDispatch);

    React.useEffect(() => {
        setErrorState(errorStateTrigger(formState, omitFieldValidation));
    }, [formState, omitFieldValidation]);

    return {
        validationFunctions: {
            genericFieldValidation,
            requiredValidation
        },
        validationState: {
            addressFormReducer: [formState, formDispatch],
            errorState
        }
    }
}