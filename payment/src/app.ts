import express from 'express'
import 'express-async-errors'
import {errorHandler} from '@katickets212/common'
import {NotFoundError ,currentuser}  from '@katickets212/common'
import {PaymentRouter} from './routes/new';
import cookieSession  from  'cookie-session'
 const app = express();
app.set('trust proxy' , true);
app.use(express.json());
app.use(cookieSession({
           
  signed:false ,
  secure:process.env.NODE_ENV !== 'test'

}));
app.use(currentuser);
app.use(PaymentRouter);
app.get("*" , async(req ,res,next)=>{
  throw new NotFoundError();
})

app.use(errorHandler)

export {app};