import {OrderCreatedEvents , OrderStatus} from '@katickets212/common'
import {OrderCreatedListener} from '../order-created-listener'
import{natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../Models/Ticket';
import {Message} from 'node-nats-streaming';
import mongoose from 'mongoose';
const setup =   async ()=>{
    //create an instance of the  listener
    const listener =  new OrderCreatedListener(natsWrapper.client);

    //create and save a ticket
    const ticket =  Ticket.build({
        title:'concert' ,
        price:21 ,
        userId:'ass'
    });

    await ticket.save();

    //creat the fake data event

    const data:OrderCreatedEvents['data']= {
        id:new mongoose.Types.ObjectId().toHexString() ,
        status: OrderStatus.Created,
        userId: 'adsdsd',
        version: 0,
        expiresAt: 'asds',
        ticket: {
            id: ticket.id ,
            price: ticket.price,
        }
    }; 

//@ts-ignore
    const msg:Message = {
        ack:jest.fn(),
    }

    return {listener , ticket ,data , msg}
};


it('sets  the userId of the ticket' , async () => {
    
 const  {listener  , ticket , data,  msg} =  await setup();

 await listener.onMessage(data , msg);

 const updatedTicket =  await Ticket.findById(ticket.id);


 expect(updatedTicket!.orderId).toEqual(data.id);


});



it('acks the message' , async () => {
    const  {listener  , ticket , data,  msg} =  await setup();

    await listener.onMessage(data , msg);

    expect(msg.ack).toHaveBeenCalled();
   
})