import {OrderCancelledEvent , OrderStatus} from '@katickets212/common'
import {OrderCancelledListener} from '../order-cancelled-ticket'
import{natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../Models/Ticket';
import {Message} from 'node-nats-streaming';
import mongoose from 'mongoose';

const setup = async()=>{
    
     const listener = new OrderCancelledListener(natsWrapper.client);
const orderId = new mongoose.Types.ObjectId().toHexString();
     const ticket =  Ticket.build({
         title:'concert' ,
         price:20,
         userId:'asfgd'
     });
 
     await ticket.save();

    const data:OrderCancelledEvent['data'] =  {
        id:orderId ,
        version:0 ,
        ticketid:ticket.id
        
    }
      
    //@ts-ignore
    const msg:Message = {
        ack:jest.fn(),
    }

    return  {msg , data , ticket , orderId , listener};
};


it("updated the ticket  , publishes an event and acks the message " , async ()=>{

    const {msg ,data , ticket , orderId , listener} =  await setup();

    await listener.onMessage(data , msg);

    const updatedTicket =  await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();

      expect(msg.ack).toHaveBeenCalled();
      expect(natsWrapper.client.publish).toHaveBeenCalled();
});