import nats , {Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto';
import {TicketCreatedListener} from './Events/ticketCreatedListener'

const stan =  nats.connect("ticketing", randomBytes(4).toString("hex") , {
    url:"http://localhost:4222"
});



stan.on("connect" ,()=>{
    console.log("connected");

stan.on("close" , ()=>{
console.log("nats connection closed");
process.exit();
})

new TicketCreatedListener(stan).listen();

} ); 

process.on("SIGINT" , ()=>stan.close());
process.on("SIGTERM" , ()=>stan.close());



