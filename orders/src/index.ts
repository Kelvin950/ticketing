import mongoose from 'mongoose'
import  {app} from './app';
import {natsWrapper} from './nats-wrapper';
import {TicketCreatedListener} from './Events/Listeners/ticket-created-listeners'
import {ExpirationCompleteListener} from './Events/Listeners/expiration-complete-listener'
import {TicketUpdatedListener} from './Events/Listeners/ticket-updated-listener'
import {PaymentCreatedListener} from './Events/Listeners/payment-crreated-listener'
const start =  async()=>{

  if(!process.env.JWt_KEY){
    throw new Error("JWt key must be defined");
  }
  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI must be defined");
  }
  if(!process.env.NATS_CLUSTER_ID){
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  if(!process.env.NATS_URL){
    throw new Error("NATS_URL must be defined");
  }
  if(!process.env.NATS_CLIENT_ID){
    throw new Error("NATS_CLIENT_ID must be defined");
  }
 try{
   await natsWrapper.connect(process.env.NATS_CLUSTER_ID ,process.env.NATS_CLIENT_ID, process.env.NATS_URL);
   natsWrapper.client.on("close" , ()=>{
    console.log("nats connection closed");
    process.exit();
    });

    process.on("SIGINT" , ()=>natsWrapper.client.close());
process.on("SIGTERM" , ()=>natsWrapper.client.close());

new TicketCreatedListener(natsWrapper.client).listen();
new TicketUpdatedListener(natsWrapper.client).listen();
new  ExpirationCompleteListener(natsWrapper.client).listen();
new PaymentCreatedListener(natsWrapper.client).listen();
  const host = await mongoose.connect(process.env.MONGO_URI)
  console.log(`host ${host.connection.host}`)
 }catch(err){
   console.log(err);
 }
 app.listen(3000 , ()=>{
  console.log('Listen on port 3000');
});
}

start();
