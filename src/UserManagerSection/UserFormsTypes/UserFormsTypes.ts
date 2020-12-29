export type UserFormButtonProps = { formId: FormId, formValidity: boolean, formState: FormState<any> };

export type AccountFieldId = "generic" | "email" | "password" | "repeatPassword";

export type AddressFieldId = "complement" | "country" | "city" | "state" | "street" | "zipcode"

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
