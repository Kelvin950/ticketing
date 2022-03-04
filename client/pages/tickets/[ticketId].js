import useRequest from '../../hooks/useRequest';

function TicketShow({ticket}) {

const  {doRequest , errors} =  useRequest({
    url:"/api/order",
    method:'post',
    body:{
        ticketId:ticket.id
    },
    onSuccess:(order)=>console.log(order)

});
    return ( 
       <div>
            <h1>
          { ticket.title}
        </h1>
        <h4>
           { ticket.price}
        </h4>
        {errors}
    <button className="btn btn-primary" onClick={doRequest}>Purchase</button>
       </div>

     );
};


TicketShow.getInitialProps =  async(context , client)=>{
    const {ticketId}  =  context.query;
    const {data}  = await client.get(`/api/tickets/${ticketId}`)

    return  {ticket:data};
}

export default TicketShow;