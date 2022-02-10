import {Response ,Request ,NextFunction}from 'express'
import jwt from 'jsonwebtoken';

 interface Payload{
     id:string,
     email:string
 }

 declare global{
     namespace Express{
         interface Request{
             currentUser?:Payload
         }
     }
 }

export const currentuser = (

    req:Request ,res:Response ,next:NextFunction
)=>{

 if(!req.session?.jwt){
         
    return next();
     
 }

 try{
              
    const payload =  jwt.verify(req.session.jwt ,   process.env.JWt_KEY! ) as Payload;

    req.currentUser=payload;
    // console.log(req.currentUser);
     
      }catch(err){

       
      }


      next();
}