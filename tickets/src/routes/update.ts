import express , {Request ,Response , NextFunction} from 'express';
import {Ticket} from '../Models/Ticket';
import {validateRequest ,requireAuth} from '@katickets212/common';
import {body} from 'express-validator';
import {UpdateController} from '../controller/newController';
const router =  express.Router();

router.put("/api/tickets/:id" ,requireAuth , [body("title").not().isEmpty().withMessage("Title is required") , body("price").isFloat({gt:0}).withMessage("price must be provided and must be greater than 10")] ,validateRequest ,UpdateController);



export {router as UpdateTicketRouter};