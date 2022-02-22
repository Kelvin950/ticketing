import nats from 'node-nats-streaming';


import {TickedCreatedPublisher} from './Events/ticketCreatedPublisher'
const stan =  nats.connect("ticketing" , 'abc' , {
    url:"http://localhost:4222"
});

stan.on("connect" , async ()=>{
    console.log("publisher connected to  nats");

    // const data =JSON.stringify( {
    //     id:"123",
    //     title:"connect",
    //     price:20
    // });
  
    // stan.publish('ticket:created' ,data , ()=>{
    //     console.log("Event published");
    // })

const publisher =  new TickedCreatedPublisher(stan );
try{
    await publisher.publish({
        id:'123',
        title:'concert',
        price:20
    })
}catch(err){
    console.log(err);
}
});

