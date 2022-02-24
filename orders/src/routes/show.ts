import  express from 'express';
import {showController} from '../controller/TicketController'
import {requireAuth} from '@katickets212/common'
const router =  express.Router();


router.get("/api/order/:orderId" ,requireAuth , showController);


export {router as showOrderRouter};