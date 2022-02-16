import {Request , Response}  from 'express'
import {validationResult}  from  'express-validator';
import {User} from  '../Models/Users'
import {RequestValidationError} from  '@katickets212/common'
import {BadRequestError}  from '@katickets212/common';
import jwt from 'jsonwebtoken';
const signUpController =  
async (req:Request ,res:Response )=>{

const {email , password }:{email:string , password:string} =  req.body ;
     

const existingUser =  await User.findOne({email});
 
if(existingUser){
    // console.log("Email in use");
    // return res.send({});
   
    throw new BadRequestError('Email in use');
}

 
const user  =  User.build({
    email , password
});
await user.save() ;


const userJwt =  jwt.sign({
    id:user.id  ,
    email:user.email 
} ,  
 process.env.JWt_KEY!
);

 req.session =  {
     jwt:userJwt
 } ; 
res.status(201).send(user)
 ;


}

export default  signUpController