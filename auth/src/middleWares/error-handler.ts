import {Request , Response , NextFunction}  from 'express'
import {CustomError} from '../errors/CustomError'
import { DatabaseConnectionError } from '../errors/database-connectionError';
import {RequestValidationError} from '../errors/request-validation'
export const errorHandler=  (err:Error ,req:Request,res:Response,next:NextFunction)=>{


    console.log(err);
if(err instanceof CustomError){
    console.log("handling this error as a request validation error");


return res.status(err.statusCode).send({errors:err.serializeErrors()});
}


res.status(400).send({
  err:err.message
});
}