import {UserModel} from "../Utilities/UserModels/UserModel";
import {api} from "./AxiosInstance";
import {ResponseStatusCode} from "../Utilities/RouterValidation/ResponseStatusCodes";
import {ErrorModel} from "../Utilities/UserModels/ErrorModel";

export class UserRequestManager {
    public async registerUser(userName: string, email: string, password: string): Promise<UserModel> {
        const user = await api.post<UserModel | ErrorModel>("/account/register", {
            displayName: userName,
            email,
            password
        }, {
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        });
        if (user.status in ResponseStatusCode) {
            throw new Error((user.data as ErrorModel).message);
        }
        return (user.data as UserModel);
    }
}