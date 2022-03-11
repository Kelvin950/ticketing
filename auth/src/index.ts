import mongoose from 'mongoose';
import  {app} from './app'
const start =  async()=>{
console.log("starting up");
  if(!process.env.JWt_KEY){
    throw new Error("JWt key must be defined");
  }
  if(!process.env.MONGO_URI){
    throw new Error("mongo must be defined");
  }
 try{
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
