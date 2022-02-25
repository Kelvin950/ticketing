import mongoose from 'mongoose';
import  {OrderStatus} from '@katickets212/common';
import {TicketDoc} from './Ticket';

export {OrderStatus};
interface OrderAttrs{
   userId:string ;
   status:OrderStatus;
   expiresAt:Date;
   ticket:TicketDoc;
}


interface  OrderDoc extends  mongoose.Document {

    userId:string ;
    status:OrderStatus;
    expiresAt:Date;
    ticket:TicketDoc;

}


interface orderModel extends mongoose.Model<OrderDoc>{
    buildOrders(attrs:OrderAttrs):OrderDoc
}

const orderSchema =  new mongoose.Schema({
   
    userId:{
        type:String,
        required:true

    } ,

    status:{
        type:String ,
        required:true,
        enum:Object.values(OrderStatus),
        default:OrderStatus.Created,
    }
    ,
    expiresAt:{
        type:mongoose.Schema.Types.Date,
   
    } ,
 
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket'
    }


} ,  {
    toJSON:{
        transform(doc ,ret){
            ret.id =  ret._id ;
            delete ret._id
        }
    }
});




orderSchema.statics.buildOrders =  (attrs:OrderAttrs)=>{
    return  new Order(attrs);
}


const Order =  mongoose.model<OrderDoc , orderModel>('Order', orderSchema);

export  {Order};