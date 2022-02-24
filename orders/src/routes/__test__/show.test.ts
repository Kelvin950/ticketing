import mongoose  from 'mongoose';
import request from 'supertest';
import {Ticket} from '../../models/Ticket';
import {Order , OrderStatus} from '../../models/order';
import  {app} from '../../app';


it("fetches the order" , async ()=>{

    //create a ticket
      const ticket =  Ticket.build({
          title:'concet' 
          ,
          price:20
      })

      await ticket.save();
      const user =  global.signup();
 //make a request to build an order with this ticket
  
  const {body :order} = await request(app)
 .post("/api/order")
 .set("Cookie" , user)
 .send({ticketId:ticket.id})
 .expect(201) ;


 //make request to fetch the order
console.log(order);
 const {body :fetchedOrder}  =await request(app)
 .get(`/api/order/${order.id}`)
 .set("Cookie" , user)
 .send()
 .expect(200)

       
 expect(fetchedOrder.id).toEqual(order.id);



})
