import {Listener , OrderCancelledEvent ,Subject , OrderStatus} from '@katickets212/common';
import {queueGroupName} from './queue-group-name';
import {Message} from 'node-nats-streaming'
import {Order} from '../../Models/Orders'

export class OrderCancelledListener  extends Listener<OrderCancelledEvent>{

    subject:Subject.OrderCancelled =  Subject.OrderCancelled ;
    queueGroupName =  queueGroupName;
    
  
    async onMessage(data:OrderCancelledEvent['data'] , msg:Message){
         
        const order  =  await Order.findOne({
       _id : data.id ,
       version :data.version -1 
        });


     if(!order){
         throw new Error("order not found");
     }

     order.set({status:OrderStatus.Cancelled});

     await order.save();
     msg.ack();
    }
   

 
}
