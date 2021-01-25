import jwtDecode from "jwt-decode";

type JwtPayload = { given_name: string, email: string };

/**
 * Utilities' methods for getting information from JWT
 */
export class JwtManager {
    public jwt_key = "jwt";

    get jwt(): string | null {
        return sessionStorage.getItem(this.jwt_key);
    }

    set jwt(token: string | null) {
        if (token) {
            sessionStorage.setItem(this.jwt_key, token);
        } else {
            throw new Error("The jwt must have a value");
        }
    }

    public deleteJwt(): void {
        if (this.jwt) {
            sessionStorage.removeItem(this.jwt_key);
        } else {
            throw new Error("No _jwtManager.jwt found to be deleted");
        }
    }

    public getDisplayNameFromJwt(): string | null {
        return this.jwt ? jwtDecode<JwtPayload>(this.jwt).given_name : null;
    }

    public getEmailFromJwt(): string | null {
        return this.jwt ? jwtDecode<JwtPayload>(this.jwt).email : null;
    }
}
