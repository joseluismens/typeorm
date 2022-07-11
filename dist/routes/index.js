"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const product_routes_1 = __importDefault(require("./product.routes"));
const routes = (0, express_1.Router)();
routes.use("/api", user_1.default);
routes.use("/api", auth_1.default);
routes.use("/api", product_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map