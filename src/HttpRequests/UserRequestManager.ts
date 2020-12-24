import {FullUserModel, UserLoginModel, UserModel} from "../Utilities/UserModels/FullUserModel";
import {api} from "./AxiosInstance";
import {ResponseStatusCode} from "../Utilities/RouterValidation/ResponseStatusCodes";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";

export class UserRequestManager {
    jwtToken: string | undefined;

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
        this.jwtToken = (user.data as FullUserModel).jwtToken;
        this.storeJwt(this.jwtToken);
        return (user.data as UserModel);
    }

    public async userLogin(email: string, password: string): Promise<UserLoginModel> {
        const login = await api.post<FullUserModel | UserLoginModel | ErrorModel>("/account/login", {
            password,
            email
        }, {
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        });
        if (login.status in ResponseStatusCode) {
            throw new Error((login.data as ErrorModel).message);
        }
        this.jwtToken = (login.data as FullUserModel).jwtToken;
        this.storeJwt(this.jwtToken);
        return (login.data as UserLoginModel);
    }

    public async emailExists(email: string): Promise<boolean> {
        return (await api.get<boolean>(`/account/emailexists?email=${email}`)).data;
    }

    public storeJwt(jwtToken: string): void {
        sessionStorage.setItem("jwt", jwtToken);
    }

    public getJwt(jwtToken: string): string | null {
        return sessionStorage.getItem(jwtToken);
    }

    public deleteJwt(jwtToken: string): void {
        sessionStorage.removeItem(jwtToken);
    }
}