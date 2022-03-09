function OrderShow({order}) {

    const mseft= new Date(order.expiresAt + 33).getTime()- new Date().getTime();

    return (

        <div>
            {mseft} seconds
            until the order expires
        </div>
      );
}


OrderShow.getInitialProps = async(context ,client)=>{
const {orderId}  = context.query;
const {data}=await client.get(`/api/order/${orderId}`);

return {order:data};
}
export default OrderShow;