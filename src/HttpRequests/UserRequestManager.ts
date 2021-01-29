import {AxiosError} from "axios";
import {api} from "./AxiosInstance";
import {FullUserModel, UserModel} from "../Utilities/UserModels/FullUserModel";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import {AddressFieldId, FormState} from "../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddressModel} from "../Utilities/UserModels/UserAddressModel";
import {formToAddressMapper} from "../Utilities/Mappers/AddressFormMapper";
import {JwtManager} from "./JwtManager/JwtManager";

export class UserRequestManager {
    public jwtManager = new JwtManager();

    private _defaultHeader(): { headers: { [i: string]: string } } {
        return {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${this.jwtManager.jwt}`
            }
        };
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
            this.jwtManager.jwt = (user.data as FullUserModel).token;
            return (user.data as UserModel);
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
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
            this.jwtManager.jwt = (login.data as FullUserModel).token;
            return (login.data as UserModel);
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }

    public async registerUserAddress(addressForm: FormState<AddressFieldId>): Promise<UserAddressModel> {
        const userAddress = formToAddressMapper(addressForm);
        try {
            const address = await api.put<UserAddressModel | ErrorModel>("/account/address",
                {...userAddress},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.jwtManager.jwt}`
                    }
                }
            );
            return address.data as UserAddressModel;
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }

    public async getUserAddress(): Promise<UserAddressModel> {
        try {
            const address = await api.get<UserAddressModel>("/account/address", this._defaultHeader());
            return address.data;
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }
}

export const emailExists = async (email: string): Promise<boolean> => {
    return (await api.get<boolean>(`/account/emailexists?email=${email}`)).data;
}
