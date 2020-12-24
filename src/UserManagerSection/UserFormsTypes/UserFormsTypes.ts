export type UserFormButtonProps = { formId: FormId, formValidity: boolean, formState: FormState<FieldId> };
export type FieldId = "username" | "email" | "password" | "repeatPassword";
export type ErrorState = Record<FieldId, boolean>;

export type FormState<T extends string | number | symbol> = Record<T, {
    requiredValidity: boolean,
    submitButtonDisable: boolean,
    fieldValue?: string,
    patternValidity?: boolean }>;

export enum FormId {
    SIGNUP = "SIGNUP",
    LOGIN = "LOGIN"
}
