import {ExpirationCompleteEvent , OrderStatus} from '@katickets212/common'
import {ExpirationCompleteListener} from '../expiration-complete-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose';
import {Ticket} from '../../../models/Ticket'
import {Order} from '../../../models/order'
import {Message } from 'node-nats-streaming';

const setup = async () => {
    
    const listener =  new ExpirationCompleteListener(natsWrapper.client);

 const ticket = Ticket.build({
     id:new  mongoose.Types.ObjectId().toHexString(),
     title:'conert',
     price:21
 });

 await ticket.save();
 const order=  Order.buildOrders({
      status:OrderStatus.Created ,
      userId:"Dsd",
      expiresAt:new Date(),
      ticket
 })
 await order.save();

 const data :ExpirationCompleteEvent['data']= {
   orderId:order.id
 } ;
 //@ts-ignore
 const msg:Message  = {
     ack:jest.fn()
 }
return {listener , order , ticket , data, msg};
} 


it("updates the order status to cancelled" , async()=>{
    const {listener , order , ticket , data, msg}  = await setup();

await listener.onMessage(data , msg);
const updatedOrder=  await Order.findById(order.id);
expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it("emit an ordercancelled event" , async()=>{
    const {listener , order , ticket , data, msg}  = await setup();

     await listener.onMessage(data ,msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData=JSON.parse( (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]) ;

  expect(eventData.id).toEqual(order.id);

})

it("ack the message" ,  async()=>{
    const {listener , order , ticket , data, msg}  = await setup();

    await listener.onMessage(data , msg);

    expect(msg.ack).toHaveBeenCalled();
})