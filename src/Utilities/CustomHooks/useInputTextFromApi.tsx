import * as React from "react";
import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";

export const setFieldFocused = (inputRef: React.RefObject<HTMLDivElement>): void => {
    const label = inputRef.current?.querySelector("label");
    if (label) {
        label.setAttribute("data-shrink", "true");
        label.classList.add("MuiInputLabel-shrink", "Mui-focused", "Mui-focused");
    }
}

export const fieldValueFromApi: Record<AddressFieldId, boolean> = {
    firstName: false,
    lastName: false,
    zipcode: false,
    complement: false,
    state: false,
    country: false,
    city: false,
    street: false
}

/**
 * Fill up the user address form with data come from api
 * @param addressField the address key to index the field in the address user form
 * @param ref an optional form div reference
 * @param formState the form state to fill the form
 * @param fieldValueState an optional dispatch function to set the value of a select input
 */
export const useInputTextFromApi = (
    addressField: AddressFieldId,
    {ref, formState, fieldValueState}:
        {
            ref?: React.RefObject<HTMLDivElement>,
            formState?: FormState<AddressFieldId>,
            fieldValueState?: React.Dispatch<React.SetStateAction<string>>
        }
): void => {
    const formFieldValue = formState?.[addressField].fieldValue;
    fieldValueFromApi[addressField] = formState?.[addressField].fieldValueFromApi ?? false;

    React.useEffect(() => {
        if (fieldValueFromApi[addressField]) {
            if (ref) {
                if (ref.current) {
                    const input = ref.current.querySelector("input");
                    if (input) {
                        input.value = formFieldValue ?? "";
                    }
                }
                setFieldFocused(ref);
                fieldValueFromApi[addressField] = false;
            }
            if (fieldValueState) {
                fieldValueState(formFieldValue ?? "");
            }
        }
    }, [ref, formFieldValue, addressField, fieldValueState]);
}