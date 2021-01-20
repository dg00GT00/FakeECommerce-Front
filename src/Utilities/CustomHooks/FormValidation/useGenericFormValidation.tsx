import * as React from "react";
import {ActionTypes} from "./FormActionTypes";
import {GenericFormActions} from "./genericFormReducer";

type GenericFormValidation<T extends string> = {
    requiredValidation: (event: any, fieldId: T) => void,
    genericFieldValidation: (event: any, fieldId: T) => void,
}

/**
 * Creates the base of form validation built upon a initial form state and an error state in which will be used
 * to control the valid of submit button
 * @param genericFormDispatch a dispatch function came from a specific form validation hook
 * @return an object which contains the already validated form state, the error state and dispatch function and the
 * required and generic form validation functions
 */
export const useGenericFormValidation = <T extends string>(genericFormDispatch: React.Dispatch<GenericFormActions<T>>): GenericFormValidation<T> => {
    /**
     * Enforces the required attribute of a field
     * @param event the onBlur of onChange event
     * @param fieldId the field id for requirement validation
     */
    function requiredValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: T): void;
    function requiredValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: T): void;
    function requiredValidation(event: any, fieldId: T): void {
        genericFormDispatch({
            fieldId,
            type: ActionTypes.REQUIRED,
            fieldValidity: event.target.checkValidity()
        });
    }

    /**
     * Encompasses the required validation plus the retrieval of it input value
     * @param event the onBlur or onChange event
     * @param fieldId the field id for requirement validation
     */
    function genericFieldValidation(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: T): void;
    function genericFieldValidation(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldId: T): void;
    function genericFieldValidation(event: any, fieldId: T): void {
        requiredValidation(event, fieldId);
        genericFormDispatch({type: ActionTypes.GENERIC, fieldId, fieldValue: event.currentTarget.value});
    }

    return {
        requiredValidation,
        genericFieldValidation
    }
};