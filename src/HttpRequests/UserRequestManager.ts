import {FullUserModel, UserModel} from "../Utilities/UserModels/FullUserModel";
import {ResponseStatusCode} from "../Utilities/RouterValidation/ResponseStatusCodes";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {api} from "./AxiosInstance";
import jwtDecode from "jwt-decode";
import {AxiosError} from "axios";
import {AddressFieldId, FormState} from "../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../Utilities/UserModels/UserAddressModel";
import {addressFormMapper} from "../Utilities/Mappers/AddressFormMapper";

const userAccountMessageByStatusCode = (statusCode: number | undefined): string => {
    if (statusCode === ResponseStatusCode["401"]) {
        return "Email or password wrong!";
    }
    if (statusCode === ResponseStatusCode["400"]) {
        return "Error when creating an account";
    }
    return "Something went wrong. Try again!";
}

const userAddressMessageByStatusCode = (statusCode: number | undefined): string => {
    if (statusCode === ResponseStatusCode["400"]) {
        return "Error when setting address";
    }
    return "Something went wrong. Try again!";
}

export class UserRequestManager {
    private jwt_key = "jwt";

    set jwt(token: string | null) {
        if (token) {
            sessionStorage.setItem(this.jwt_key, token);
        } else {
            throw new Error("The jwt must have a value");
        }
    }

    get jwt(): string | null {
        return sessionStorage.getItem(this.jwt_key);
    }

    public getDisplayNameFromJwt(): string | null {
        if (this.jwt) {
            return jwtDecode<{ given_name: string }>(this.jwt).given_name;
        }
        return null;
    }

    public async registerUser(userName: string, email: string, password: string): Promise<UserModel> {
        try {
            const user = await api.post<FullUserModel | ErrorModel>("/account/register", {
                displayName: userName,
                email,
                password
            }, {
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            });
            this.jwt = (user.data as FullUserModel).token;
            return (user.data as UserModel);
        } catch (e) {
            const error = userAccountMessageByStatusCode((e as AxiosError).response?.status);
            return Promise.reject(error);
        }
    }

    public async userLogin(email: string, password: string): Promise<UserModel> {
        try {
            const login = await api.post<FullUserModel | UserModel | ErrorModel>("/account/login", {
                password,
                email
            }, {
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            });
            this.jwt = (login.data as FullUserModel).token;
            return (login.data as UserModel);
        } catch (e) {
            const error = userAccountMessageByStatusCode((e as AxiosError).response?.status);
            return Promise.reject(error);
        }
    }

    public async registerUserAddress(addressForm: FormState<AddressFieldId>): Promise<UserAddressModel> {
        const userAddress = addressFormMapper(addressForm);
        try {
            const address = await api.put<UserAddressModel | ErrorModel>("/account/address",
                {...userAddress},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.jwt}`
                    }
                }
            );
            return address.data as UserAddressModel;
        } catch (e) {
            const error = userAddressMessageByStatusCode((e as AxiosError).response?.status);
            return Promise.reject(error);
        }
    }

    public deleteJwt(): void {
        if (this.jwt) {
            sessionStorage.removeItem(this.jwt_key);
        } else {
            throw new Error("No jwt found to be deleted");
        }
    }
}

export const emailExists = async (email: string): Promise<boolean> => {
    return (await api.get<boolean>(`/account/emailexists?email=${email}`)).data;
}
