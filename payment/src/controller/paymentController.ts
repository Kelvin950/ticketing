import express , {Request ,Response } from 'express';
import {
BadRequestError, NotFoundError 
  , NotAuthorizedError,
  OrderStatus} from '@katickets212/common'
import {Order} from '../Models/Orders'
import {Payment} from '../Models/Payment';
import {stripe} from '../stripe';
import {PaymentCreatedPublisher} from '../events/publsiher/payment-created-publisher';
import {natsWrapper} from '../nats-wrapper'
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

  const charges = await stripe.charges.create({
        currency:'usd',
        amount:order.price *100,
        source:token
    });

    const payment =  Payment.build({
        orderId ,
        stripeId:charges.id ,
    }) ;

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id:payment.id ,
        orderId:payment.orderId ,
        stripeId:payment.stripeId
    });
     res.status(201).send({success:true , charge:charges , id:payment.id})

 }