import * as React from "react";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";
import {UserModel} from "../UserModels/FullUserModel";

const userAuth = new UserRequestManager();

export const AuthContext = React.createContext({
    // A hack to make the return value of this function be string or null
    getJwt: () => ({} as {[i: string]: string | null}).value,
    user: userAuth,
    userLogin: async (email: string, password: string) => Promise.resolve({displayName: "", email: ""}),
    registerUser: async (userName: string, email: string, password: string) => Promise.resolve({
        displayName: "",
        email: ""
    })
});

export const AuthContextProvider: React.FunctionComponent = props => {
    const user = React.useRef<UserRequestManager>(userAuth);

    const registerUser = async (userName: string, email: string, password: string): Promise<UserModel> => {
        return await userAuth.registerUser(userName, email, password);
    }

    const userLogin = async (email: string, password: string): Promise<UserModel> => {
        return await userAuth.userLogin(email, password);
    };

    const getJwt = (): string | null => {
        return userAuth.jwt;
    }

    return (
        <AuthContext.Provider value={{user: user.current, getJwt, registerUser, userLogin}}>
            {props.children}
        </AuthContext.Provider>
    )
}