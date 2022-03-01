import {Ticket} from '../Ticket';

// it('implements optimistic concurrency control' , async () => {


//     //create an instance of a ticket
//     const ticket =  Ticket.build({
//         title:'concert',
//         price:5,
//         userId:'123'
//     })
//     //save the ticket to the database

//     await ticket.save();
//     //fetch the ticket twice
// const fisrtInstance =  await Ticket.findById(ticket.id);
// const secondInstance=  await Ticket.findById(ticket.id);
//     //make two separate changes to the tickets we fetched
//   fisrtInstance!.set({price:10})
//   secondInstance!.set({price:15});
//     //save the first fetched ticket
//      await fisrtInstance!.save();

//     //save the second fetched ticket and expect an error
// try{
//     await secondInstance!.save();
// }catch(err){
//     return;
// }


// throw new Error('should not reach this point');



    
// })  