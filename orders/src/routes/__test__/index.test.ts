import mongoose  from 'mongoose';
import request from 'supertest';
import {Ticket} from '../../models/Ticket'
import {Order , OrderStatus} from '../../models/order'
import  {app} from '../../app'

const buildTicket = async  ()=>{
    const ticket =  Ticket.build({
        title:"concert" ,
        price:20
    })

    await ticket.save();
    return ticket;
}
it("fetches orders for a particular user" ,async () => {
     //create three tickets
 const ticketOne = await buildTicket()    
 const ticketTwo = await buildTicket()    
 const ticketThree = await buildTicket()  ;
 
 const userOne= global.signup();

 const userTwo =  global.signup();
     //create one order as user #1
     await request(app)
     .post('/api/order')
     .set("Cookie" , userOne)
     .send({ticketId:ticketOne.id})
     .expect(201)
     //create  two order as user #2

  const { body:orderOne}  = await request(app)
     .post('/api/order')
     .set("Cookie" , userTwo)
     .send({ticketId:ticketTwo.id})
     .expect(201)
     const { body:orderTwo} =   await request(app)
     .post('/api/order')
     .set("Cookie" , userTwo)
     .send({ticketId:ticketThree.id})
     .expect(201)
     //make request to get orders for user #2
  const res=    await request(app)
  .get('/api/order')
  .set("Cookie" ,userTwo)
  .send({})
  .expect(200);
  
  console.log(res.body);
     //make sure we only got the orders for user #2
     expect(res.body.length).toEqual(2);
     expect(res.body[0].id).toEqual(orderOne.id);
     expect(res.body[1].id).toEqual(orderTwo.id);
    
});


it("fetches orders for a particular user" ,async () => {
    

});

it("fetches orders for a particular user" ,async () => {
    

});

