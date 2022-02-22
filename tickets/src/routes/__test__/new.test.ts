import  request from 'supertest';
import  {app} from '../../app';
import {Ticket} from '../../Models/Ticket';
import {natsWrapper} from '../../nats-wrapper';

it("has a route handler listening to /api/tickets for post request" , async () => {
    
const res = await request(app)
            .post('/api/tickets')
            .send({});

        expect(res.status).not.toEqual(404);

});


it("can only be accessed if user is signed in" , async () => {
    
    const res = await request(app)
    .post('/api/tickets')
    .send({});

    expect(res.status).toEqual(401);

});

it("returns a status other than 401 if the user is signed in" , async () => {
    const res= await request(app)
    .post('/api/tickets')
    .set("Cookie" , global.signup())
    .send({});
console.log(res.status);
    expect(res.status).not.toEqual(401)

})

it("it returns an error if an invalid title is provided" , async () => {
    await request(app)
    .post("/api/tickets")
    .set("Cookie" , global.signup())
    .send({
        title:"",
        price:10
    })
    .expect(400)

 
    await request(app)
    .post("/api/tickets")
    .set("Cookie" , global.signup())
    .send({price:10})
    .expect(400);
});


it("returns an error if an invalid price is provided" , async () => {
    await request(app)
    .post("/api/tickets")
    .set("Cookie" , global.signup())
    .send({
        title:"cscsd",
        price: -10
    })
    .expect(400)

 
    await request(app)
    .post("/api/tickets")
    .set("Cookie" , global.signup())
    .send({
        title:"cscsd"})
    .expect(400);


});



it("creates a ticket with valid inputs" , async () => {
   await Ticket.deleteMany({})
  let  tickets= await Ticket.find({});
    expect(tickets.length).toEqual(0);
    
     
    await request(app)
    .post("/api/tickets")
    .set("Cookie" , global.signup())
    .send({
        title:"cscsd",
    price:20.00})
    .expect(201);

  
   tickets =  await Ticket.find({});
     expect(tickets.length).toEqual(0);
     expect(tickets[0].price).toEqual(20);
     expect(tickets[0].title).toEqual("cscsd");
});


it("publishes an event" ,async()=>{
    await request(app)
    .post("/api/tickes")
    .send ({
        ticket:"212",
        price:21
    })
    .expect(201);
   expect(natsWrapper.client.publish).toHaveBeenCalled();
});