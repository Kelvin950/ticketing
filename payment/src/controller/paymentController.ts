import express , {Request ,Response } from 'express';
import {
BadRequestError, NotFoundError 
  , NotAuthorizedError,
  OrderStatus} from '@katickets212/common'
import {Order} from '../Models/Orders'
import {stripe} from '../stripe';
 export const newController =  async (req:Request , res:Response)=>{
 
    const {token , orderId} =  req.body ;

    const order =  await Order.findById(orderId);
    if(!order){
        throw new NotFoundError();    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    if(order.status === OrderStatus.Cancelled){
        throw new BadRequestError("Cannot pay for a cancelled order");
    }

    await stripe.charges.create({
        currency:'usd',
        amount:order.price *100,
        source:token
    });
     res.send({success:true})

 }