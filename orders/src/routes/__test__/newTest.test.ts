import mongoose  from 'mongoose';
import request from 'supertest';
import {Ticket} from '../../models/Ticket'
import {Order , OrderStatus} from '../../models/order'
import  {app} from '../../app';
import {natsWrapper} from '../../nats-wrapper';
it("returns an error if the ticket does not exist" ,async ()=>{

    const ticketId = new  mongoose.Types.ObjectId();
    await request(app)
    .post('/api/order')
    .set("Cookie" , global.signup())
    .send({ticketId})
     .expect(404);
});


it("returns an error if the ticket is already reserved" , async () => {
    
     const ticket =  Ticket.build({
         title:'concert' ,
         price:20,
         id: new mongoose.Types.ObjectId().toHexString()
     })
 await ticket.save();

  const order =  Order.buildOrders({
      ticket ,
      userId:"dsds" ,
      status:OrderStatus.Created ,
      expiresAt:new Date()
  })

  await order.save();

  await request(app)
  .post("/api/order")
  .set("Cookie" , global.signup()) 
  .set({ticketId:ticket.id})
  .expect(400);
});

it("reserves a ticket" , async () => {
    const ticket =  Ticket.build({
        title:'concer2t' ,
        price:21,
        id: new mongoose.Types.ObjectId().toHexString()
    })
await ticket.save();

 await request(app)
 .post("/api/order")
 .set("Cookie" , global.signup())
 .send({ticketId:ticket.id})
.expect(201)

})
;

it("emits an order created event  " , async () => {
    const ticket =  Ticket.build({
        title:'concer2t' ,
        price:21,
        id: new mongoose.Types.ObjectId().toHexString()
    })
await ticket.save();

 await request(app)
 .post("/api/order")
 .set("Cookie" , global.signup())
 .send({ticketId:ticket.id})
.expect(201);


expect(natsWrapper.client.publish).toHaveBeenCalled();
    

});