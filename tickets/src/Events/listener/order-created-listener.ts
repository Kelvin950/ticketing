import {Listener , OrderCreatedEvents , Subject} from '@katickets212/common'
import {queueGroupName} from './queue-group-name'
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../Models/Ticket';
export class OrderCreatedListener extends Listener<OrderCreatedEvents>{

    subject:Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName =  queueGroupName;

  async  onMessage(data:OrderCreatedEvents['data'] , msg:Message){
    //find the ticket the order is reserving
    const ticket =  await Ticket.findById(data.ticket.id);
    //!ticket throw error

    if(!ticket){
      throw new Error("Ticket not found");
    }
    //Mark the ticket as being reserved by setting its orderId property
      ticket.set({orderId:data.id})
    //save the ticket
await ticket.save();
     //ack the message

     msg.ack();
    }

}