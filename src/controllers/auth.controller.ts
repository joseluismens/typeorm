import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";

export default class AuthController {

    static login = async (req: Request, res: Response) => {

        const { username, password } = req.body;
        if (!(username && password)) return res.status(500).send({message:'error'});

        const user = await User.findOneBy({ username: username });
        if (!user) return res.status(500).send({ message: "Este usuario no esta registrado en nuestro sistema" });
        //check password

        if (!user.checkIfUnencryptedPasswordIsValid(password)) return res.status(500).send({ message: "La contraseña es incorrecta" });
        const token = jwt.sign(
            {
                userId: user.id,
                username: username
            },
            config.jwtSecret,
            { expiresIn: '1h' }
        );
        res.header('auth-token', token).json({id:user.id,username:user.username,token:token});

    }

    static changePassword = async (req: Request, res: Response) => {

        console.log(req.header('auth-token'));
        
        const id = res.locals.jwtPayload.userId;
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword)) return res.status(400).send();
        
        const user = await User.findOneBy(id);

        if (!user) return res.status(401).send();
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) return res.status(401).send();

        user.password = newPassword;
        const errors = await validate(user);
        
        if (errors.length > 0) return res.status(400).send(errors);
        
        //Hash the new password and save
        user.hashPassword();
        User.update({id:id},user);

        res.status(204).send();
    };




}