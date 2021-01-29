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

    public async registerUserAsync(userName: string, email: string, password: string): Promise<UserModel> {
        try {
            const user = await api.post<FullUserModel | ErrorModel>("/account/register", {
                displayName: userName,
                email,
                password
            }, {
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            });
            this.jwtManager.jwt = (user.data as FullUserModel).token;
            this.jwtManager.setJwtCacheKey();
            return (user.data as UserModel);
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }

    public userLogout(): void {
        this.jwtManager.deleteJwtCacheKey();
        this.jwtManager.deleteJwt();
    }

    public async userLoginAsync(email: string, password: string): Promise<UserModel> {
        try {
            const login = await api.post<FullUserModel | UserModel>("/account/login", {
                password,
                email
            }, {
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            });

            this.jwtManager.jwt = (login.data as FullUserModel).token;
            this.jwtManager.setJwtCacheKey();
            return (login.data as UserModel);
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }

    public async registerUserAddressAsync(addressForm: FormState<AddressFieldId>): Promise<UserAddressModel> {
        const userAddress = formToAddressMapper(addressForm);
        try {
            const address = await api.put<UserAddressModel>("/account/address",
                {...userAddress},
                this.jwtManager.getJwtAuthorizationHeaders()
            );

            return address.data;
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }

    public async getUserAddressAsync(): Promise<UserAddressModel> {
        try {
            const address = await api.get<UserAddressModel>("/account/address",
                this.jwtManager.getJwtAuthorizationHeaders());
            return address.data;
        } catch (e) {
            return Promise.reject((e as AxiosError).response?.status);
        }
    }
}

export const checkEmailExistenceAsync = async (email: string): Promise<boolean> => {
    return (await api.get<boolean>(`/account/emailexists?email=${email}`)).data;
}
