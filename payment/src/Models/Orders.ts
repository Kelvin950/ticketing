import  mongoose from 'mongoose'; 
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'
import{OrderStatus} from '@katickets212/common'

interface orderAttrs{
     id:string;
     version:number;
     userId:string;
     price:number;
     status: OrderStatus;
}

interface orderDoc extends  mongoose.Document{

version:number ;
userId:string;
price:number;
status:OrderStatus

}

interface orderModel extends mongoose.Model<orderDoc>{

     build(attrs:orderAttrs):orderDoc
}


const  orderSchema =  new  mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    } ,

    status:{
        type:String,
        required:true
    }
} ,{

    toJSON:{
        transform(doc ,ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
}
);


orderSchema.statics.build=(
    attrs:orderAttrs
)=>{
    return new Order({
       _id:attrs.id ,
       version : attrs.version ,price : attrs.price ,
       userId : attrs.userId ,
       status : attrs.status ,



    });
};

orderSchema.set("versionKey" , "version");
orderSchema.plugin(updateIfCurrentPlugin);

const Order =  mongoose.model<orderDoc , orderModel>('Order' , orderSchema);

export {Order}