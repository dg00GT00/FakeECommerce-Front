import {FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {ActionTypes} from "./FormActionTypes";

export type GenericFormActions<T> =
    | { type: ActionTypes.REQUIRED, fieldId: T, fieldValidity: boolean }
    | { type: ActionTypes.GENERIC, fieldId: T, fieldValue: string }

/**
 * Generic form reducer to build upon the a specific form reducer
 * @param prevState the state to feed up this reducer
 * @param action a generic form action
 * @return the modified state or at least the state unchanged
 */
export const genericFormReducer = <T extends string>(prevState: FormState<T>, action: GenericFormActions<T>): FormState<T> => {
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
                [action.fieldId]: {
                    ...prevState[action.fieldId],
                    fieldValue: action.fieldValue
                }
            };
        default:
            return prevState;
    }
}