import  express from 'express';

const router =  express.Router();

import {requireAuth} from '@katickets212/common'
import {deleteController} from '../controller/TicketController'
router.delete("/api/order/:orderId" , requireAuth , deleteController);


export {router as deleteOrderRouter};