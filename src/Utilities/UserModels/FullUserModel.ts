export type FullUserModel = {
    userName: string,
    email: string,
    jwtToken: string
}

export type UserModel = Omit<FullUserModel, "jwtToken">;

export type UserLoginModel = {
    email: string,
    password: string
}