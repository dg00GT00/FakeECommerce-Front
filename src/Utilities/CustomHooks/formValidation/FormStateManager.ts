import {FormState} from "../../../UserManagerSection/UserFormsTypes/UserFormsTypes";

/**
 * Decides the availability of the form submit button
 * @param formState the form state used to check the submit button state
 * @param omitFieldValidators an array of field that not will be considered when validating the
 * availability of submit button
 * @param errorStateMiddleware an function that will be run between the validation loop in order to put
 * some more criteria in the validation process
 */
export const errorStateTrigger = <T extends string>(formState: FormState<T>, omitFieldValidators?: T[], errorStateMiddleware?: (key: T, ...args: any[]) => FormState<T>): boolean => {
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