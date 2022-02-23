import {Request ,Response } from 'express'
import 'express-async-errors';
 import {Ticket} from '../models/Ticket';
 import {Order} from '../models/order'

export const newController = (req:Request,res:Response)=>{
   //Find the ticket the user is trying to order in the database

   //make sure that the ticket is not already reserved
}  