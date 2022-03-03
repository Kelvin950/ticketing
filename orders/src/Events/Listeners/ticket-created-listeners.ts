import {Message}  from 'node-nats-streaming';
import {Ticket} from '../../models/Ticket';
import  {Subject  , Listener ,TicketCreatedEvent}  from '@katickets212/common';

import {queueGroupName} from './queue-group-name'
export class  TicketCreatedListener extends  Listener<TicketCreatedEvent>{

    subject:Subject.TicketCreated = Subject.TicketCreated;
    queueGroupName =  queueGroupName;


    async onMessage(data:TicketCreatedEvent['data'] , msg:Message){
       
    const  {id,title ,price} =data ;
    const ticket = Ticket.build({

      id,  title , price
    })
  
    await  ticket.save();
console.log(ticket);

     msg.ack();

    }
    
}