import * as React from "react";
import {UserRequestManager} from "../../HttpRequests/UserRequestManager";
import {UserModel} from "../UserModels/FullUserModel";
import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../UserModels/UserAddressModel";

const userAuth = new UserRequestManager();

export const AuthContext = React.createContext({
    // A hack to make the return value of this function be string or null
    getJwt: () => ({} as {[i: string]: string | null}).value,
    user: userAuth,
    userLogin: async (email: string, password: string) => Promise.resolve({}),
    registerUser: async (userName: string, email: string, password: string) => Promise.resolve({}),
    userAddress: async (addressForm: FormState<AddressFieldId>) => Promise.resolve({}),
    getUserAddress: async () => Promise.resolve({})
});

export const AuthContextProvider: React.FunctionComponent = props => {
    const user = React.useRef<UserRequestManager>(userAuth);

    const userAddress = async (addressForm: FormState<AddressFieldId>): Promise<UserAddressModel> => {
        return await userAuth.registerUserAddress(addressForm);
    }

    const registerUser = async (userName: string, email: string, password: string): Promise<UserModel> => {
        return await userAuth.registerUser(userName, email, password);
    }

    const userLogin = async (email: string, password: string): Promise<UserModel> => {
        return await userAuth.userLogin(email, password);
    };

    const getUserAddress = async (): Promise<FormState<AddressFieldId>> => {
        return await userAuth.getUserAddress();
    }

    const getJwt = (): string | null => {
        return userAuth.jwt;
    }

    return (
        <AuthContext.Provider value={{user: user.current, getJwt, registerUser, userLogin, userAddress, getUserAddress}}>
            {props.children}
        </AuthContext.Provider>
    )
}