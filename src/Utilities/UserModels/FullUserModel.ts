export type FullUserModel = {
    displayName: string,
    email: string,
    token: string
}

export type UserModel = Omit<FullUserModel, "token">;