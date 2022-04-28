import { DataSource } from "typeorm";
import { Assistence } from "./entity/Assistence";
import { Category } from "./entity/Category";
import { Client } from "./entity/Client";
import { Product } from "./entity/Product";
import {User} from "./entity/User";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "typeormdb",
    synchronize: true,
    logging: true,
    entities: [User,Assistence,Category,Client,Product],
    subscribers: [],
    migrations: [],
});