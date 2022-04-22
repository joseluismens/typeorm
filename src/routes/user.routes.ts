import { Router } from "express";
import * as UserController  from "../controllers/user.controller"
const router =  Router();

router
    .get('/users',UserController.getUsers)
    .post('/users',UserController.createUser);



router.get("/users/:id", UserController.getUser)
        .put("/users/:id", UserController.updateUser)
        .delete("/users/:id", UserController.deleteUser)

export default router;
