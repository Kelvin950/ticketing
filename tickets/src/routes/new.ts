import express , {Request ,Response , NextFunction} from 'express'
import {requireAuth ,validateRequest} from '@katickets212/common';
import {newTickets} from '../controller/newController';
import  {body} from 'express-validator';
const router =  express.Router();

router.post('/api/tickets' , 


requireAuth ,[
 body("title").not().isEmpty().withMessage("Title is required")
,body("price").isFloat({gt:0}).withMessage("Price must be greater than zero")
],validateRequest, newTickets);

export  {router as createTicketRouter};