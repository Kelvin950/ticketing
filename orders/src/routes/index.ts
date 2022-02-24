import  express from 'express';

const router =  express.Router();
import {requireAuth} from '@katickets212/common'
import {indexController} from '../controller/TicketController'

router.get("/api/order" ,requireAuth ,indexController );


export {router as indexOrderRouter};