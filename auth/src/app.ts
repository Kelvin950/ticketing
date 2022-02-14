import express from 'express';
import {CurrentUserRouter} from './Route/currentUser';
import {signInRouter}  from './Route/SignIn'
import 'express-async-errors'
import signOutRouter from  './Route/signout' ;
import {signupRouter}  from './Route/signup'
import {errorHandler} from './middleWares/error-handler'
import {NotFoundError}  from './errors/NotFoundError';

import cookieSession from 'cookie-session'
const app = express();
app.set('trust proxy' , true);
app.use(express.json());
app.use(cookieSession({
           
  signed:false ,
  secure:process.env.NODE_ENV !== 'test'

}))
app.use(CurrentUserRouter);
app.use(signupRouter);
app.use(signOutRouter) 
app.use(signInRouter);
app.get("*" , async(req ,res,next)=>{
  throw new NotFoundError();
})

app.use(errorHandler)

export {app};