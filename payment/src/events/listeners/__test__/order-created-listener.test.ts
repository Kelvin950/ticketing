import {natsWrapper} from '../../../nats-wrapper'
import {OrderCreatedEvents, OrderStatus}  from '@katickets212/common';
import {OrderCreatedListener} from '../order-created-listener';
import mongoose from 'mongoose';
import {Order} from '../../../Models/Orders';
const setup =  async ()=>{

    const listener =  new OrderCreatedListener(natsWrapper.client);
   const data:OrderCreatedEvents['data']={
       id: new mongoose.Types.ObjectId().toHexString() ,
    version: 0  , 
    expiresAt : 'asad' ,
    userId : 'asas' , 
    status: OrderStatus.Created,
    ticket:{
        id:"DSDs",
        price:10
    }
   }

   //@ts-ignore
   const msg:Message={
       ack:jest.fn()
   }

   return {listener , data , msg};
};

it("replicates the order info " , async () => {
    
     const  {listener , data  ,msg} =  await setup();
     await listener.onMessage(data , msg);
    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price)
}) ;

it("acks the message" , async()=>{
    const  {listener , data  ,msg} =  await setup();
    await listener.onMessage(data , msg);

    expect(msg.ack).toHaveBeenCalled();
}) ;