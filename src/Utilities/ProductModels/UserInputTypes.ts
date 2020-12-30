import {AddressFieldId, FormId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";

export type UserInputTypes = {
    InputLabelProps: { classes: { root: string } },
    InputProps: { notched: boolean },
    showRequiredLabel: boolean,
    formId: FormId,
    className?: string,
    formState?: FormState<AddressFieldId>,
    funcValidation?: (event: any, fieldId: AddressFieldId) => void;
};