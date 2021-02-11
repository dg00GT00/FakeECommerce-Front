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

    public getJwtAuthorizationHeaders(): { headers: { [p: string]: string } } {
        return {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${this.jwt}`
            }
        };
    }

    public deleteJwt(): void {
        if (this.jwt) {
            sessionStorage.removeItem(this.jwt_key);
        } else {
            throw new Error("No jwt found to be deleted");
        }
    }

    public setJwtCacheKey(): void | never {
        const jwtCacheKey = this.getJwtCacheKey();
        if (jwtCacheKey) {
            sessionStorage.setItem(jwtCacheKey, jwtCacheKey);
        } else {
            throw new Error("No jwt found to retrieve email information of");
        }
    }

    public getJwtCacheKey(): string | null {
        return this.getEmailFromJwt();
    }

    public deleteJwtCacheKey(): void | never {
        const jwtCacheKey = this.getJwtCacheKey();
        if (jwtCacheKey) {
            sessionStorage.removeItem(jwtCacheKey);
        } else {
            throw new Error("No jwt found to retrieve information of");
        }
    }

    public getDisplayNameFromJwt(): string | null {
        return this.jwt ? jwtDecode<JwtPayload>(this.jwt).given_name : null;
    }

    public getEmailFromJwt(): string | null {
        return this.jwt ? jwtDecode<JwtPayload>(this.jwt).email : null;
    }
}
