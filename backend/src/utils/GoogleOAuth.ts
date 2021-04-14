import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

const authorizedIssuers = [
    'https://accounts.google.com',
    'https://www.accounts.google.com',
];

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
        const callbackUrl = "https://pangio.freemyip.com/ristoro/api/auth/googlecallback";
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

        const payload = this.parseHttpToIUser(res.data);
        if(!authorizedIssuers.includes(payload.issuer)) throw new Error(`Wrong jwt issuer google oauth: ${payload.issuer}`);
        
        // TODO: CHECK TOKEN WITH GOOGLE'S PUBLIC KEY
        return payload;
    }

    private parseHttpToIUser(res: any): IGoogleUser {
        const payload = jwt.decode(res.id_token) as any;
        if(!payload) throw new Error("NULL JWT GOOGLE OAUTH TOKEN");
        return {
            name: this.beautifyName(payload.name),
            email: payload.email,
            issuer: payload.iss,
            hd: payload.hd,
            userId: payload.sub,
            isStudent: this.getIsStudent(payload.hd),
        };
    }

    private getIsStudent(hd: string): boolean {
        return hd.split('.')[0] == 'studenti';
    }

    private beautifyName(name: string) {
        name = name.toLowerCase();
        // [ ciao ] => [ Ciao ]
        return name.split(' ').map((namePart) => namePart[0].toUpperCase() + namePart.substring(1)).join(' ');
    }
}

export interface IGoogleUser {
    name: string;
    email: string;
    issuer: string;
    hd: string;
    userId: string;
    isStudent: boolean;
} 