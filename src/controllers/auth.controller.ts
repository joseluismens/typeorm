import { Response, Request } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

export  const signUp = async (req:Request, res:Response)=>{
    
    const {email,password} = req.body;

    const user = new User();
    user.email = email;
    user.password = password;
    await user.save();


    const token = jwt.sign({id:user.id},'secretKey');
    
    
    return res.status(200).json({token});

}

export  const signIn = async (req:Request, res:Response)=>{
    
    const {email,password} = req.body;
    const user = await User.findOne({where:{email:email}});

    if (!user) return res.status(401).send("the email doesn't exists");
    if(user.password !==password) return res.status(401).send('wrong Password');

    const token = jwt.sign({id:user.id},'secretKey');

    
    
    return res.status(200).json({token});

}



