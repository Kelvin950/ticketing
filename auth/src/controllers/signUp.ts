import {Request , Response}  from 'express'
import {validationResult}  from  'express-validator';
import {User} from  '../Models/Users'
import {RequestValidationError} from '../errors/request-validation'
import {BadRequestError}  from '../errors/BadRequestError';
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