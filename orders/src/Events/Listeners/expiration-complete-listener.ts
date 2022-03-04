import { ExpirationCompleteEvent, Listener, Subject ,OrderStatus } from '@katickets212/common';
import {queueGroupName} from './queue-group-name'
import {Message}  from 'node-nats-streaming'
import {Order} from '../../models/order';
import {OrderCancelledPublisher} from '../publishers/order-cancelled-event';
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{

    subject:Subject.ExpirationComplete =  Subject.ExpirationComplete;
   queueGroupName= queueGroupName 
    async onMessage(data:ExpirationCompleteEvent['data'] , msg:Message){

        const order = await Order.findById(data.orderId).populate('ticket');

        if(!order){
            throw new Error("order not found");
        }
     
        if(order.status === OrderStatus.Complete){
        return msg.ack();
        }
    order.set({status:OrderStatus.Cancelled});
    await order.save();
//     console.log(order);
// console.log(order.ticket.id);
   await new OrderCancelledPublisher(this.client).publish({
        id:order.id ,
        version:order.version,
        ticketid:order.ticket.id

    })

    msg.ack();
    } ;

   


}