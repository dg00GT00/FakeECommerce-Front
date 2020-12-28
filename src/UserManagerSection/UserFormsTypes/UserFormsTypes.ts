export type UserFormButtonProps = { formId: FormId, formValidity: boolean, formState: FormState<any> };
export type FieldId = "generic" | "email" | "password" | "repeatPassword";

export type FormState<T extends string | number | symbol> = Record<T, {
    requiredValidity: boolean,
    submitButtonDisable: boolean,
    fieldValue?: string,
    patternValidity?: boolean }>;

export enum FormId {
    SIGNUP = "SIGNUP",
    LOGIN = "LOGIN",
    ADDRESS = "ADDRESS"
}
