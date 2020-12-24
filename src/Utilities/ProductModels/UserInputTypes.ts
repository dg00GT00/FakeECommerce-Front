import {FormId} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";

export type UserInputTypes = {
    InputLabelProps: { classes: { root: string } },
    InputProps: { notched: boolean },
    showRequiredLabel: boolean,
    formId: FormId
}
