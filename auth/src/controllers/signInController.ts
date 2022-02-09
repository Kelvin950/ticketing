import {Request ,Response}  from 'express';
 import {validationResult}  from 'express-validator'
 import {RequestValidationError} from '../errors/request-validation'
const signIn = (req:Request ,res:Response)=>{
  
  

res.send({});
}

export {signIn}