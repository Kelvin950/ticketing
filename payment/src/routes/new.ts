import express , {} from 'express';
import {body} from 'express-validator';

import {requireAuth  , RequestValidationError ,validateRequest } from '@katickets212/common';
import {newController} from '../controller/paymentController';
import {Order} from '../Models/Orders'

const router =  express.Router();

router.post("/api/payment" , requireAuth , [body('token').not().isEmpty() , 
body('orderId').not().isEmpty()]  , validateRequest , newController);



export {router as PaymentRouter};