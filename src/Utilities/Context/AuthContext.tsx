import * as React from "react";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";
import {UserLoginModel, UserModel} from "../UserModels/FullUserModel";

export const AuthContext = React.createContext({
    user: {},
    registerUser: async (userName: string, email: string, password: string) => {},
    userLogin: async (email: string, password: string) => {}
});

const userAuth = new UserRequestManager();

let jwtToken: string | undefined;

export const AuthContextProvider: React.FunctionComponent = props => {
    const user = React.useRef<UserModel | UserLoginModel | null>(null);

    const registerUser = async (userName: string, email: string, password: string): Promise<void> => {
        user.current = await userAuth.registerUser(userName, email, password);
    }

    const userLogin = async (email: string, password: string): Promise<void> => {
        user.current = await userAuth.userLogin(email, password);
    };

    return (
        <AuthContext.Provider value={{user, registerUser, userLogin}}>
            {props.children}
        </AuthContext.Provider>
    )
}