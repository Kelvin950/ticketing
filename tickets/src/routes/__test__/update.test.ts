
import mongoose from 'mongoose';
import request from 'supertest';
import {natsWrapper} from '../../nats-wrapper'

import {app} from '../../app';
const createTicket =  ()=>{
    return  request(app)
      .post("/api/tickets")
      .set("Cookie" ,global.signup())
      .send({
          title:"dks",
          price:20
      });
  }
it("returns a 404 if the provided id does not exist" , async ()=>{
    const id = new  mongoose.Types.ObjectId().toHexString();   
await request(app)

.put(`/api/tickets/${id}`)
.set("Cookie" , global.signup())
.send({
    title:"Dsds",
    price:20
})
.expect(404)

});

it("returns a 401 if the user is not authenticated" , async ()=>{
    const id = new  mongoose.Types.ObjectId().toHexString();   
await request(app)

.put(`/api/tickets/${id}`)

.send({
    title:"Dsds",
    price:20
})
.expect(401)
})

it("returns a 401 if the user does not own the ticket" , async ()=>{
   const res =  await createTicket();
console.log(res.body);
    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie" , global.signup())
    .send({
        title:"fdff",
        price:100
    })
    .expect(401)
})

it("returns  a 401 if the user provides an invalid title or price" , async ()=>{
 const cookie  =  global.signup()
 const  res=await request(app)
.post("/api/tickets")
.set("Cookie" ,cookie)
.send({
    title:"dks",
    price:20
});

await request(app)
.put(`/api/tickets/${res.body.id}`).set("Cookie" ,cookie)
.send({
    title:"",
    price:20
})
.expect(400)


await request(app)
.put(`/api/tickets/${res.body.id}`).set("Cookie" ,cookie)
.send({
    title:"dsd",
    price:-20
})
.expect(400)



})
it("returns a 200" , async ()=>{
       
    const cookie  =  global.signup()
 const  res=await request(app)
.post("/api/tickets")
.set("Cookie" ,cookie)
.send({
    title:"dks",
    price:20
});
 
  await request(app)
 .put(`/api/tickets/${res.body.id}`)
 .set("Cookie" , cookie)
 .send({
     title:"new title",
     price:200
 })
   .expect(200)


   const ticketResponse= await request(app)
   .get(`/api/tickets/${res.body.id}`)
   .send();

   expect(ticketResponse.body.title).toEqual("new title");
   expect(ticketResponse.body.price).toEqual(200);

})

// it("returns a 404 if the provided id does not exist" , async ()=>{
    
// })

it("publishes an event", async ()=>{
    const cookie  =  global.signup()
    const  res=await request(app)
   .post("/api/tickets")
   .set("Cookie" ,cookie)
   .send({
       title:"dks",
       price:20
   });
    
     await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie" , cookie)
    .send({
        title:"new title",
        price:200
    })
      .expect(200)
   
      expect(natsWrapper.client.publish).toHaveBeenCalled();
})