import * as React from "react";
import {AddressFieldId, FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {useGenericFormValidation} from "./useGenericFormValidation";
import {GenericFormActions, genericFormReducer} from "./genericFormReducer";
import {errorStateTrigger} from "./FormStateManager";

type AddressReducer = React.Reducer<FormState<AddressFieldId>, GenericFormActions<AddressFieldId>>;

const initialFormState: FormState<AddressFieldId> = {
    complement: {requiredValidity: false, submitButtonDisable: false},
    state: {requiredValidity: false, submitButtonDisable: false},
    city: {requiredValidity: false, submitButtonDisable: false},
    country: {requiredValidity: false, submitButtonDisable: false},
    street: {requiredValidity: false, submitButtonDisable: false},
    zipcode: {requiredValidity: false, submitButtonDisable: false},
}

export const useAddressFormValidation = () => {
    const [errorState, setErrorState] = React.useState(true);
    const [formState, formDispatch] = React.useReducer<AddressReducer>(genericFormReducer, initialFormState);
    const {genericFieldValidation, requiredValidation} = useGenericFormValidation(formDispatch);

    React.useEffect(() => {
        setErrorState(errorStateTrigger(formState));
    }, [formState]);

    return {
        validationFunctions: {
            genericFieldValidation,
            requiredValidation
        },
        validationState: {
            formState,
            errorState
        }
    }
}