import  express from 'express';
import {requireAuth , validateRequest}  from '@katickets212/common';
import mongoose from 'mongoose';
import  {body} from 'express-validator';
import {newController} from '../controller/TicketController'
const router =  express.Router();


router.post("/api/order" , requireAuth ,  [
    body('ticketId').not().isEmpty().custom((input:string)=>{
        return mongoose.Types.ObjectId.isValid(input)
    }).withMessage("ticket id must be provided")
] ,
validateRequest , newController);


export {router as newOrderRouter};