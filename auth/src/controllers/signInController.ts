import {Request ,Response}  from 'express';
import 'express-async-errors'
import jwt from 'jsonwebtoken';
 import {User} from '../Models/Users';
 import {BadRequestError} from '@katickets212/common'
 import {Password} from '../services/password';
const signIn = async (req:Request ,res:Response)=>{
  
    const {email ,password} = req.body;

    const existingUser = await  User.findOne({email});

    if(!existingUser){
        throw new BadRequestError("Invalid credentials");
    }

// console.log(existingUser);
   const passwordMatch = await Password.compare(existingUser.password , password);
// console.log(passwordMatch);
   if(!passwordMatch){
       throw new  BadRequestError("Invalid credentials");
   }

  const userJWT =  jwt.sign({
      id:existingUser.id , email:existingUser.email
  } , 
  process.env.JWt_KEY!
  );

  req.session ={
      jwt:userJWT
  }

res.status(200).send(existingUser);
}

export {signIn}