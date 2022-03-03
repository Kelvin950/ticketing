import {Listener , OrderCreatedEvents ,Subject} from '@katickets212/common';
import {queueGroupName} from './queue-group-name';
import {Message} from 'node-nats-streaming'
import {Order} from '../../Models/Orders'
export class OrderCreatedListener extends Listener<OrderCreatedEvents>{
subject:Subject.OrderCreated =  Subject.OrderCreated ; 
queueGroupName =  queueGroupName;
async onMessage(data:OrderCreatedEvents['data'], msg:Message ){
 
    const order =  Order.build({
        id:data.id ,
        price:data.ticket.price ,
        status:data.status ,
        userId:data.userId ,
        version :data.version
    })
    await order.save();

    msg.ack()
}

}