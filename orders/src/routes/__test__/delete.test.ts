import mongoose  from 'mongoose';
import request from 'supertest';
import {Ticket} from '../../models/Ticket'
import {Order , OrderStatus} from '../../models/order'
import  {app} from '../../app'

it("should throw  a 404 erro , r" ,async()=>{
   
    const id =  new mongoose.Types.ObjectId();

    await request(app)
    .delete(`/api/order/${id}`)
    .set("Cookie" , global.signup())
    .send({})
    .expect(404)


}) ;


it("should throw a 400 bad request" , async () => {


    const user1 =  global.signup();

    const ticket =  Ticket.build({
        title:'concer2t' ,
        price:21
    })
await ticket.save();

  const {body:order} = await request(app)
 .post("/api/order")
 .set("Cookie" ,user1)
 .send({ticketId:ticket.id})
.expect(201)

 
const {body:fetchOrder} = await request(app)
.get(`/api/order/${order.id}`)
.set("Cookie" , user1)
.send()
.expect(200)
 
console.log(fetchOrder);

await request(app)
.delete(`/api/order/${fetchOrder.id}`)
.set("Cookie" , global.signup())
.send()
.expect(401)

})


it("order status should be equal to cancelled" , async()=>{
    const user1 =  global.signup();

    const ticket =  Ticket.build({
        title:'concer2t' ,
        price:21
    })
await ticket.save();

  const {body:order} = await request(app)
 .post("/api/order")
 .set("Cookie" ,user1)
 .send({ticketId:ticket.id})
.expect(201)

 

 


await request(app)
.delete(`/api/order/${order.id}`)
.set("Cookie" , user1)
.send()
.expect(204)


const updatedOrder =  await  Order.findById(order.id);

expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);



})


it.todo("emits a order cancelled event")