export type FullUserModel = {
    displayName: string,
    email: string,
    token: string
}

export type UserModel = Omit<FullUserModel, "jwtToken">;

export type UserLoginModel = {
    email: string,
    password: string
}