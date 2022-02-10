import express , {Request,Response ,NextFunction} from 'express';

import jwt from 'jsonwebtoken'

export const currentUserController=(req:Request , res:Response , next:NextFunction)=>{

  
    res.send({currentUser:req.currentUser || null });
    


}