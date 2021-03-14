import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

export default class GoogleOAuth {

    clientId: string;
    clientSecret: string;

    constructor(clientId?: string, clientSecret?: string) {
        this.clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
        this.clientSecret = clientSecret || process.env.GOOGLE_OAUTH_SECRET;
    }

    /**
     * The url that the client should call to login
     */
    public get oauthUrl() {
        const hd = "gobettivolta.edu.it";
        const scope = "https://www.googleapis.com/auth/userinfo.email";
        const callbackUrl = "http://localhost:8080/api/auth/googlecallback";
        return `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${callbackUrl}&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&hd=${hd}`
    }

    public async getUserFromCallback(code: string): Promise<IGoogleUser> {
        const tokenUrl = "https://oauth2.googleapis.com/token";
        const redirectUri = "http://localhost:8080/api/auth/googlecallback";
        const grantType = "authorization_code";

        const res = await axios.post(tokenUrl, {
            code,
            client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_SECRET,
            redirect_uri: redirectUri,
            grant_type: grantType,
        });

        return this.parseHttpToIUser(res.data);
    }

    private parseHttpToIUser(res: any): IGoogleUser {
        const payload = jwt.decode(res.id_token) as any;
        if(!payload) throw new Error("NULL JWT GOOGLE OAUTH TOKEN");
        return {
            name: payload.name,
            email: payload.email,
            issuer: payload.iss,
            hd: payload.hd,
            userId: payload.sub,
        };
    }
}

export interface IGoogleUser {
    name: string;
    email: string;
    issuer: string;
    hd: string;
    userId: string;
} 