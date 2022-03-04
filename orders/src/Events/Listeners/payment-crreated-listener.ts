import {Subject  , Listener ,PaymentCreatedEvent} from '@katickets212/common';
import { queueGroupName } from './queue-group-name';
import {Order ,OrderStatus} from '../../models/order';
import {Message} from 'node-nats-streaming'

export class PaymentCreatedListener extends Listener <PaymentCreatedEvent>{

    subject:Subject.PaymentCreated =  Subject.PaymentCreated;

    queueGroupName =  queueGroupName;

    async onMessage(data:PaymentCreatedEvent['data'] , msg:Message){
    
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error("Order not found");
        }

        order.set({
            status:OrderStatus.Complete
        })

        await order.save();
        msg.ack();
    }
}