import {Request ,Response } from 'express'
import 'express-async-errors';
 import {Ticket} from '../models/Ticket';
 import {Order} from '../models/order'
 import {OrderCancelledPublisher} from '../Events/publishers/order-cancelled-event';
 import {OrderCreatedPublisher} from  '../Events/publishers/order-createdd-events';
 import {natsWrapper} from '../nats-wrapper';
import {NotFoundError , OrderStatus ,BadRequestError ,NotAuthorizedError} from '@katickets212/common';
const EXPIRATION_WINDOW_SECONDS =  1 * 60;
export const newController =  async (req:Request,res:Response )=>{
   //Find the ticket the user is trying to order in the database
const {ticketId} =  req.body;
const ticket =  await Ticket.findById(ticketId)  ;

if(!ticket){
    throw new NotFoundError();
}
   //make sure that the ticket is not already reserved
 // run query to look at all orders . 
 //find an order where the ticket is the ticket we just found
 //and the orders statuse is not cancalled.
 //if we find an order from the db that means the ticket is reserved
 const isReserved = await ticket.isReserved();
  if(isReserved){
    
      throw new BadRequestError("Ticket is already reserved");
  }
   //calculate the expiration date 
  const expiration =  new Date();
  expiration.setSeconds(expiration.getSeconds() +   EXPIRATION_WINDOW_SECONDS);
console.log(expiration);
   //build the order and save it to the database 
     const order =  Order.buildOrders({
        userId:req.currentUser!.id ,
        status:OrderStatus.Created ,
        expiresAt:expiration ,
        ticket:ticket

     })
     
     await order.save();
   //publish an event
new OrderCreatedPublisher(natsWrapper.client).publish({
   id:order.id ,
   status:order.status ,
   userId:order.userId,
   expiresAt:order.expiresAt.toISOString(),
   version:order.version,
   ticket:{
      id:ticket.id ,
      price:ticket.price,
     
   }
})

   res.status(201).send(order);
}  ;


export const indexController =async (req:Request ,res:Response)=>{

  const orders=  await Order.find({
     userId:req.currentUser!.id
  }).populate("ticket");
  
  
  res.send(orders);
};


export const showController = async (req:Request ,res:Response)=>{

   const order =  await Order.findById(req.params.orderId).populate("ticket");

   if(!order){
         throw new NotFoundError();
   }


    
if(order.userId !== req.currentUser!.id ){

   throw new NotAuthorizedError()
}

 

   res.send(order);
}



export const deleteController = async (req:Request ,res:Response)=>{

const  {orderId} =  req.params;

const order = await  Order.findById(orderId).populate("ticket"); ;

if(!order){
   throw new NotFoundError();
}


if(order.userId !== req.currentUser!.id){

   throw new  NotAuthorizedError();
}
  order.status  =OrderStatus.Cancelled; 


  await order.save();
//publishing an event saying this was cancelled
// console.log(order.ticket.id);
  new OrderCancelledPublisher(natsWrapper.client).publish({
     id:order.id ,
     version:order.version,
     ticketid:order.ticket.id.toString(),
      
     }
  )
  res.status(204).send(order);
}