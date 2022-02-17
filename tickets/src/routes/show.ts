import express , {Request ,Response , NextFunction} from 'express';
import {Ticket} from '../Models/Ticket';
import {requireAuth ,validateRequest} from '@katickets212/common';
import {showTicketController} from '../controller/newController';

const router = express.Router();

router.get("/api/tickets/:id",showTicketController  )

export {router as showTicketRouter};