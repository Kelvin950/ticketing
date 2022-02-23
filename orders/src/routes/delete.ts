import  express from 'express';

const router =  express.Router();


router.delete("/api/order/:orderId");


export {router as deleteOrderRouter};