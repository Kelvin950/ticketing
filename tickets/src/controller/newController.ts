import {Request ,Response,NextFunction} from 'express'
import {Ticket} from '../Models/Ticket';
import {NotFoundError ,NotAuthorizedError , BadRequestError} from '@katickets212/common';
import {TicketCreatedPublisher} from '../Events/publishers/ticket-created-publisher';
 import {TicketUpdatedPublisher} from '../Events/publishers/ticket-updated';
import {natsWrapper} from '../nats-wrapper'
export const newTickets =async(req:Request , res:Response)=>{

    const {title ,price} =  req.body;
    const ticket =  Ticket.build({
        title ,
        price ,
        userId:req.currentUser!.id
    });

    await ticket.save();
 await new TicketCreatedPublisher(natsWrapper.client).publish({
    id:ticket.id,
    title:ticket.title,
    price:+ticket.price ,
    userId:ticket.userId,
    version:ticket.version

})
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

// if(ticket.orderId){
//     throw new BadRequestError("Cannot edit a reserved ticket");
// }
 if(ticket.userId !== req.currentUser!.id){
     throw new NotAuthorizedError() 
 }
 
ticket.set({
    title:req.body.title ,
    price:req.body.price
});

await ticket.save();
 await new TicketUpdatedPublisher(natsWrapper.client).publish({
      title:ticket.title ,
      id:ticket.id ,
      price:ticket.price ,
      userId:ticket.userId,
      version:ticket.version
 })
res.send(ticket);

}