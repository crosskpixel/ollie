import axios from "axios";
import { BASE_URL } from "./base";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface JwtClaims {
    sub?: string;
    exp?: number;
    generatedAt?: number;
    iat?: number;
}

export class AuthAPI {

    static parseJwt(token: string) : JwtClaims {
        var base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload) as JwtClaims;
    };

    static async login(email: string, password: string) {

        const { status, token, refreshToken } = (await axios.post(`${BASE_URL}/session`, {
            email, password
        })).data;

        if(status == 'error') {
            throw new Error("Credenciais incorretas");
        }

        return { 
            accessToken: token, 
            refreshToken 
        } as LoginResponse;

    }

    static checkDateOfTokenToBeValid(jwtToken: string): boolean {
        try {
          const payload = this.parseJwt(jwtToken);
          console.log(payload, "<--- payload content")
          if (payload?.exp) {
            return new Date(payload.exp * 1000) > new Date();
          }
          return false;
        } catch (error) {
          return false;
        }
    }

}