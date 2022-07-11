"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Assistence_1 = require("./entity/Assistence");
const Category_1 = require("./entity/Category");
const Client_1 = require("./entity/Client");
const Product_1 = require("./entity/Product");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "typeormdb",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Assistence_1.Assistence, Category_1.Category, Client_1.Client, Product_1.Product],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=db.js.map