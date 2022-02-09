import express from 'express';
import {CurrentUserRouter} from './Route/currentUser';
import {signInRouter}  from './Route/SignIn'
import 'express-async-errors'
import signOutRouter from  './Route/signout' ;
import {signupRouter}  from './Route/signup'
import {errorHandler} from './middleWares/error-handler'
import {NotFoundError}  from './errors/NotFoundError';
import mongoose, { mongo } from 'mongoose';
import cookieSession from 'cookie-session'
const app = express();
app.set('trust proxy' , true);
app.use(express.json());
app.use(cookieSession({
           
  signed:false ,
  secure:true

}))
app.use(CurrentUserRouter);
app.use(signupRouter);
app.use(signOutRouter) 
app.use(signInRouter);
app.get("*" , async(req ,res,next)=>{
  throw new NotFoundError();
})

app.use(errorHandler)

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
