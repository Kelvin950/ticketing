import {Listener , OrderCreatedEvents, Subject} from '@katickets212/common';
import {queueGroupName} from './queueGroupName'
import {Message} from 'node-nats-streaming';
import {expirationQueue} from '../../queues/expirationQueue';

export class OrderCreatedListener  extends  Listener<OrderCreatedEvents>{

    subject:Subject.OrderCreated =  Subject.OrderCreated ; 
    queueGroupName = queueGroupName;

  async  onMessage(data:OrderCreatedEvents['data'] , msg:Message){

        const delay =  new Date(data.expiresAt).getTime()- new Date().getTime();
        console.log('waiting this milliseconds to process the job' ,delay);
     await  expirationQueue.add({
         orderId:data.id
     } ,
     {
         delay:60000
     }
    )
     msg.ack();
    }

    

}
