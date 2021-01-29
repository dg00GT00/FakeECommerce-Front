import * as React from "react";
import {AddressFieldId, FormState} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../UserModels/UserAddressModel";
import {appBuilder} from "../../HttpRequests/AppBuilder";
import {UserModel} from "../UserModels/FullUserModel";
import {useForceUpdate} from "../CustomHooks/useForceUpdate";

const {auth} = appBuilder();

export const AuthContext = React.createContext({
    userLogout: () => {
    },
    userLoginAsync: async (email: string, password: string) => Promise.resolve({}),
    registerUserAsync: async (userName: string, email: string, password: string) => Promise.resolve({}),
    registerUserAddressAsync: async (addressForm: FormState<AddressFieldId>) => Promise.resolve({} as UserAddressModel),
    getUserAddressAsync: async () => Promise.resolve({} as UserAddressModel),
    getDisplayNameFromJwt: ({} as { [value: string]: string | null }).value,
    jwtCacheKey: ({} as { [value: string]: string | null }).value,
    jwt: ({} as { [value: string]: string | null }).value
});

export const AuthContextProvider: React.FunctionComponent = props => {
    const forceUpdate = useForceUpdate();

    const userLogout = () => {
        auth.userLogout();
        forceUpdate();
    }

    const registerUserAsync = async (userName: string, email: string, password: string): Promise<UserModel> => {
        const userModel = await auth.registerUserAsync(userName, email, password);
        forceUpdate();
        return userModel;
    }

    const userLoginAsync = async (email: string, password: string): Promise<UserModel> => {
        const userModel = await auth.userLoginAsync(email, password);
        forceUpdate();
        return userModel;
    };

    return (
        <AuthContext.Provider
            value={{
                jwt: auth.jwtManager.jwt,
                jwtCacheKey: auth.jwtManager.getJwtCacheKey(),
                getDisplayNameFromJwt: auth.jwtManager.getDisplayNameFromJwt(),
                userLogout: () => userLogout(),
                getUserAddressAsync: () => auth.getUserAddressAsync(),
                userLoginAsync: (email, password) => userLoginAsync(email, password),
                registerUserAddressAsync: addressForm => auth.registerUserAddressAsync(addressForm),
                registerUserAsync: (userName, email, password) => registerUserAsync(userName, email, password)
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}