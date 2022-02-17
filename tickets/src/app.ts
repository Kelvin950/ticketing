import express from 'express'
import 'express-async-errors'
import {errorHandler} from '@katickets212/common'
import {NotFoundError ,currentuser}  from '@katickets212/common'
import {createTicketRouter} from './routes/new'
import {showTicketRouter} from './routes/show'
import {IndexTicketRouter} from './routes/index';
import {UpdateTicketRouter} from './routes/update'
import cookieSession  from  'cookie-session'
 const app = express();
app.set('trust proxy' , true);
app.use(express.json());
app.use(cookieSession({
           
  signed:false ,
  secure:process.env.NODE_ENV !== 'test'

}));

app.use(currentuser);
app.use(IndexTicketRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(UpdateTicketRouter);
app.get("*" , async(req ,res,next)=>{
  throw new NotFoundError();
})

app.use(errorHandler)

export {app};