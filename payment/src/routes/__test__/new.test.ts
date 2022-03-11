import request from 'supertest';
import {app} from '../../app';
import {Order} from '../../Models/Orders';
import mongoose from 'mongoose';
import {OrderStatus} from '@katickets212/common'
import {stripe} from '../../stripe';
// jest.mock("../../stripe");

it("returns a  404 when purchasing an order that does not exist" , async()=>{
         
    await request(app)
    .post("/api/payment")
    .set("Cookie" , global.signup())
    .send({
        token:"ewe" ,
        orderId:new mongoose.Types.ObjectId().toHexString()
    })
    .expect(404);
});

it("returns a 401 when purchings an order does not belong to user" , async()=>{
    const order=  Order.build({
        id:new mongoose.Types.ObjectId().toHexString(),
    version : 0
       ,price : 0 ,
       userId :new mongoose.Types.ObjectId().toHexString() ,
       status : OrderStatus.AwaitingPayment   
    });
  await order.save();

    const res=   await request(app)
    .post("/api/payment")
    .set("Cookie" , global.signup())
    .send({
        token:"Dsfd" ,
        orderId:order.id
    })
      .expect(401)

    
});


it("returns a 400 when purchasing a cancelled order" , async()=>{
    const user =  new mongoose.Types.ObjectId().toHexString();
    const order=  Order.build({
        id:new mongoose.Types.ObjectId().toHexString(),
    version : 0
       ,price : 0 ,
       userId : user,
       status : OrderStatus.Cancelled   
    });
  await order.save();

    const res=   await request(app)
    .post("/api/payment")
    .set("Cookie" , global.signup(user))
    .send({
        token:"Dsfd" ,
        orderId:order.id
    })
      .expect(400)
});


// it("returns a 201 with valid input" , async() => {
//     const user =  new mongoose.Types.ObjectId().toHexString();
//     const order=  Order.build({
//         id:new mongoose.Types.ObjectId().toHexString(),
//     version : 0
//        ,price : 20 ,
//        userId : user,
//        status : OrderStatus.Created  
//     });
//   await order.save();
     

//  await request(app)
//  .post("/api/payment")
//  .set("Cookie" , global.signup(user))
//  .send({
//      token:'tok_visa',
//      orderId:order.id,

//  })
//  .expect(201);

//  const chargeOptions =  (stripe.charges.create as jest.Mock).mock.calls[0][0]
//  expect(chargeOptions.source).toEqual('tok_visa');
//  expect(chargeOptions.amount).toEqual(20*100);
//  expect(chargeOptions.currency).toEqual('usd');
// })