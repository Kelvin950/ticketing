import {Listener} from './base-listener';
import {Message} from 'node-nats-streaming';
import {TicketCreatedEvent} from './ticket-created-events'
import { Subject } from './subjects';

export  class TicketCreatedListener extends Listener<TicketCreatedEvent>{

    subject:Subject.TicketCreated = Subject.TicketCreated;
    queueGroupName = 'payments-service';
    onMessage(data:TicketCreatedEvent['data'] , msg:Message){

console.log('Event data' ,data);


msg.ack()
    }

}