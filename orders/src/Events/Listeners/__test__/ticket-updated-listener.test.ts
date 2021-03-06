import {TicketUpdatedEvent} from '@katickets212/common'
 import {TicketUpdatedListener} from '../ticket-updated-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose';
import {Ticket} from '../../../models/Ticket'
import {Message } from 'node-nats-streaming';

const setup =  async ()=>{
 
    //create a listener 
 const listener =  new TicketUpdatedListener(natsWrapper.client);
    //create and save a ticket
 const ticket =  Ticket.build({
     title:'concert' ,
     price:21,
     id:new mongoose.Types.ObjectId().toHexString(),
 })

 await ticket.save()
    //create a fake data object
    const data :TicketUpdatedEvent['data'] = {
        version:ticket.version + 1,
        id: ticket.id,
        title:'csad',
        price:100 ,
        userId: new mongoose.Types.ObjectId().toHexString()
    }
   
    //create  a fake msg object7
      //@ts-ignore
 const msg:Message 
=  {

    ack:jest.fn()
}    //return all of this stuff

return {listener , msg ,data ,ticket}
    
};

it('finds , updates  , and saves a ticket' , async()=>{
const {msg ,data,ticket,listener}  =  await setup();

 await listener.onMessage(data ,msg);

 const updatedTicket =  await Ticket.findById(ticket.id);

 expect(updatedTicket!.title).toEqual(data.title);
 expect(updatedTicket!.price).toEqual(data.price);
 expect(updatedTicket!.version).toEqual(data.version);


});


it('acks the message' , async()=>{
   const {msg ,data,ticket ,listener} =  await setup();
   
   await listener.onMessage(data , msg);
    

   expect(msg.ack).toHaveBeenCalled();
});


it('does not call ack if the event has a skipped version number' , async () => {
    
    const  {msg ,data, listener , ticket} = await setup();
      
    data.version =  10 ;
try{
    await listener.onMessage(data , msg); 
}catch(err){

} ;

expect(msg.ack).not.toHaveBeenCalled();

})