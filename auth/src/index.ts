import mongoose, { mongo } from 'mongoose';
import  {app} from './app'
const start =  async()=>{

  if(!process.env.JWt_KEY){
    throw new Error("JWt key must be defined");
  }
 try{
  const host = await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
  console.log(`host ${host.connection.host}`)
 }catch(err){
   console.log(err);
 }
 app.listen(3000 , ()=>{
  console.log('Listen on port 3000');
});
}

start();
