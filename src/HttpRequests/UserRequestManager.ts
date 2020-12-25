import {api} from "./AxiosInstance";
import {FullUserModel, UserModel} from "../Utilities/UserModels/FullUserModel";
import {ResponseStatusCode} from "../Utilities/RouterValidation/ResponseStatusCodes";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";
import jwtDecode from "jwt-decode";

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

    public getDisplayNameFromJwt(): string | null{
        if (this.jwt) {
            return jwtDecode<{given_name: string}>(this.jwt).given_name;
        }
        return null;
    }

    public async registerUser(userName: string, email: string, password: string): Promise<UserModel> {
        const user = await api.post<FullUserModel | ErrorModel>("/account/register", {
            displayName: userName,
            email,
            password
        }, {
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        });
        if (user.status in ResponseStatusCode) {
            throw new Error((user.data as ErrorModel).message);
        }
        this.jwt = (user.data as FullUserModel).token;
        return (user.data as UserModel);
    }

    public async userLogin(email: string, password: string): Promise<UserModel> {
        const login = await api.post<FullUserModel | UserModel | ErrorModel>("/account/login", {
            password,
            email
        }, {
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        });
        if (login.status in ResponseStatusCode) {
            throw new Error((login.data as ErrorModel).message);
        }
        this.jwt = (login.data as FullUserModel).token;
        return (login.data as UserModel);
    }

    public async emailExists(email: string): Promise<boolean> {
        return (await api.get<boolean>(`/account/emailexists?email=${email}`)).data;
    }

    public deleteJwt(): void {
        if (this.jwt) {
            sessionStorage.removeItem(this.jwt_key);
        }else {
            throw new Error("No jwt found to be deleted");
        }
    }
}