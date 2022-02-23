import  express from 'express';

const router =  express.Router();


router.get("/api/order/:orderId");


export {router as showOrderRouter};