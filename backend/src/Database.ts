import { createConnection } from "typeorm";
import StudentsClass from "./models/Class";
import User from "./models/User";

export async function connect() {
    const env = process.env;

    if(
        !env.DATABASE_HOST ||
        !env.DATABASE_PORT ||
        !env.DATABASE_USER ||
        !env.DATABASE_NAME
    ) {
        console.error("Database env variables are not setted!");
        process.exit();
    }

    console.log("Connecting to database...");
    await createConnection({
        type: "mysql",
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        username: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME,
        logging: 'all',
        entities: [
            User,
            StudentsClass,
        ]
    });
}