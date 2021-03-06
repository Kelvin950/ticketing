import {Listener , OrderCancelledEvent , Subject} from '@katickets212/common'
import {queueGroupName} from './queue-group-name'
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../Models/Ticket';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated';


export class OrderCancelledListener extends  Listener<OrderCancelledEvent>{

    subject:Subject.OrderCancelled =  Subject.OrderCancelled;
    queueGroupName  = queueGroupName ;

    async  onMessage(data:OrderCancelledEvent['data'] ,msg:Message){
       
 console.log(data);
        const ticket =  await Ticket.findById(data.ticketid)
        ;
        if(!ticket){

            throw new Error('Ticket not found');
        }
    ticket.set({orderId:undefined});
await ticket.save();
       
await new TicketUpdatedPublisher(this.client).publish({
    id:ticket.id ,
     orderId:ticket.orderId,
     userId:ticket.userId ,
     price:ticket.price ,
     title:ticket.title,
     version:ticket.version
}) 
;


   msg.ack();
    }
}