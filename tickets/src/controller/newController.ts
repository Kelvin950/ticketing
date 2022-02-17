import {Request ,Response,NextFunction} from 'express'
import {Ticket} from '../Models/Ticket';
import {NotFoundError ,NotAuthorizedError} from '@katickets212/common';
export const newTickets =async(req:Request , res:Response)=>{

    const {title ,price} =  req.body;
    const ticket =  Ticket.build({
        title ,
        price ,
        userId:req.currentUser!.id
    });

    await ticket.save();

    res.status(201).send(ticket);
  
}


export const showTicketController = async(req:Request ,res:Response ,next:NextFunction)=>{
const id =  req.params.id;
    const ticket= await Ticket.findById(id);
  
    if(!ticket){
        throw new  NotFoundError();
    
    }
    

    res.send(ticket);
}

export const indexController = async (req:Request ,res:Response,next:NextFunction)=>{
   
const tickets =  await Ticket.find({}); 

 res.send(tickets)

}

export const UpdateController= async (req:Request ,res:Response,next:NextFunction)=>{
const id=  req.params.id; 

const ticket =  await Ticket.findById(id);
console.log(ticket);

if(!ticket){
    throw new NotFoundError();

}

 if(ticket.userId !== req.currentUser!.id){
     throw new NotAuthorizedError() 
 }
 
ticket.set({
    title:req.body.title ,
    price:req.body.price
});

await ticket.save();

res.send(ticket);

}