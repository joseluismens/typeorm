import { Router } from "express";
import * as AuthController  from "../controllers/auth.controller";
import { User } from "../entity/User";
import { Response, Request } from "express";


const router =  Router();

router.post('/signup',AuthController.signUp);
router.post('/signin',AuthController.signIn);
router.post('/profile',AuthController.profile);


export default router;

