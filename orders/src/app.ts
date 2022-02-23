import express from 'express'
import 'express-async-errors'
import {errorHandler} from '@katickets212/common'
import {NotFoundError ,currentuser}  from '@katickets212/common'
import {indexOrderRouter} from './routes/index';
import {newOrderRouter} from './routes/new';
import {deleteOrderRouter} from './routes/delete';
import {showOrderRouter} from './routes/show';
import cookieSession  from  'cookie-session'
 const app = express();
app.set('trust proxy' , true);
app.use(express.json());
app.use(cookieSession({
           
  signed:false ,
  secure:process.env.NODE_ENV !== 'test'

}));

app.use(currentuser);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.get("*" , async(req ,res,next)=>{
  throw new NotFoundError();
})

app.use(errorHandler)

export {app};