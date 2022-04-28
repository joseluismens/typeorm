import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import product from "./product.routes";
const routes = Router();

routes.use("/api",user);
routes.use("/api",auth);
routes.use("/api",product);

export default routes;