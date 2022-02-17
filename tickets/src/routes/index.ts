import express , {Request ,Response , NextFunction} from 'express';
import {Ticket} from '../Models/Ticket';
import {indexController} from '../controller/newController';
const router =  express.Router();

router.get("/api/tickets" , indexController);


export {router as IndexTicketRouter};

