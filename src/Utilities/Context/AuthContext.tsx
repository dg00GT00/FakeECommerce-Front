import * as React from "react";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";
import {UserModel} from "../UserModels/FullUserModel";
import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../UserModels/UserAddressModel";
import {JwtManager} from "../../HttpRequests/JwtManager/JwtManager";
import {useForceUpdate} from "../CustomHooks/useForceUpdate";

export const userAuth = new UserRequestManager();

export const AuthContext = React.createContext({
    // A hack to make the return value of this function be string or null
    userLogin: async (email: string, password: string) => Promise.resolve({}),
    registerUser: async (userName: string, email: string, password: string) => Promise.resolve({}),
    userAddress: async (addressForm: FormState<AddressFieldId>) => Promise.resolve({} as UserAddressModel),
    getUserAddress: async () => Promise.resolve({} as UserAddressModel),
    JWT_SESSION_KEY: String(),
    jwtManager: {} as JwtManager
});

export const AuthContextProvider: React.FunctionComponent = props => {
    // Forces the component update on user login and signup action
    const forceUpdate = useForceUpdate();
    console.log("Inside auth context");
    const getEmailFromJwt = (): string => {
        return userAuth.jwtManager.getEmailFromJwt() ?? "";
    }

    const userAddress = async (addressForm: FormState<AddressFieldId>): Promise<UserAddressModel> => {
        return await userAuth.registerUserAddress(addressForm);
    }

    const registerUser = async (userName: string, email: string, password: string): Promise<UserModel> => {
        const userModel = await userAuth.registerUser(userName, email, password);
        forceUpdate();
        return userModel;
    }

    const userLogin = async (email: string, password: string): Promise<UserModel> => {
        const userModel = await userAuth.userLogin(email, password);
        sessionStorage.removeItem(getEmailFromJwt());
        forceUpdate();
        return userModel;
    };

    const getUserAddress = async (): Promise<UserAddressModel> => {
        return await userAuth.getUserAddress();
    }

    return (
        <AuthContext.Provider
            value={{
                JWT_SESSION_KEY: userAuth.jwtManager.getEmailFromJwt() ?? "",
                jwtManager: userAuth.jwtManager,
                userLogin,
                userAddress,
                registerUser,
                getUserAddress
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}