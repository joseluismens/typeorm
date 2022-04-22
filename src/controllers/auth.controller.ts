import { Response, Request } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { signinValidation,signupValidation } from "../libs/joi";
dotenv.config();

export  const signUp = async (req:Request, res:Response)=>{
    
    const {error} = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);

    const {email,password} = req.body;
    const user = new User();
    user.email = email;
    user.password = password;


    const emailExists= await User.findOne({email:email});
    await user.save();


    const token = jwt.sign({id:user.id},'secretKey');
    
    
    return res.status(200).json({token});

}

export  const signIn = async (req:Request, res:Response)=>{
    
    const {email,password} = req.body;
    const user = await User.findOne({where:{email:email}});

    if (!user) return res.status(401).send("the email doesn't exists");

    try{
        const newUser:User = new User();
        newUser.email= email;
        newUser.password=   await bcrypt.hash()
        
    }


    const token = jwt.sign({id:user.id},'secretKey');

    
    
    return res.status(200).json({token});

}
export  const profile = async (req:Request, res:Response)=>{
    
  
    return res.status(200).json('profile');

}



