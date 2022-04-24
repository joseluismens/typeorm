import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";

const routes = Router();

routes.use("/api",user);
routes.use("/api",auth);

export default routes;