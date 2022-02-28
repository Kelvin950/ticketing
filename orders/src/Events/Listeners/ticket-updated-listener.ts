import {Message}  from 'node-nats-streaming';
import {Ticket} from '../../models/Ticket';
import  {Subject  , Listener ,TicketUpdatedEvent}  from '@katickets212/common';

import {queueGroupName} from './queue-group-name'
export class  TicketUpdatedListener extends  Listener<TicketUpdatedEvent>{

    subject:Subject.TicketUpdated = Subject.TicketUpdated;
    queueGroupName =  queueGroupName;


    async onMessage(data:TicketUpdatedEvent['data'] , msg:Message){
    
    const  {id,title ,price} =data ;
    const ticket = await Ticket.findByEvent(data)

    if(!ticket){
        throw new Error("ticket ,not found");
    }

    ticket.set({title ,price});
    await ticket.save();
  
    msg.ack();
}

}