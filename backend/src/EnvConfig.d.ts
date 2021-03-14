declare namespace NodeJS {
    export interface ProcessEnv {
        // Database config
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_USER: string;
        DATABASE_PASSWORD?: string;
        DATABASE_NAME: string;

        // jwt key
        JWT_KEY: string;

        // Google OAuth
        GOOGLE_OAUTH_CLIENT_ID: string;
        GOOGLE_OAUTH_SECRET: string;
    }
}