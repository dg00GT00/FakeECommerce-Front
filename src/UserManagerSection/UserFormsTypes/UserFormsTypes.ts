export type FieldId = "username" | "email" | "password" | "repeatPassword";
export type ErrorState = Record<FieldId, boolean>;
export type FormState<T extends string | number | symbol> = Record<T, { requiredValidity: boolean, patternValidity?: boolean }>;