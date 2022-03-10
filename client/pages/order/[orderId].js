import {useState , useEffect} from 'react';
function OrderShow({order}) {

    const [timeLeft  , setTimeLeft] =  useState(0);
 

    useEffect(()=>{
        
        const findTimeLeft=()=>{
            const mseft= new Date(order.expiresAt).getTime()- new Date().getTime();
            setTimeLeft(Math.round(mseft/1000));

        };
findTimeLeft();
  const timerId=       setInterval(findTimeLeft , 1000);

  return ()=>{
      clearInterval(timerId);
  }
    
    } ,  [order]);
    console.log(timeLeft);

    if(timeLeft <=0){
        return <div>
            Order expired
        </div>
    }
    return (

        <div>
            {
            timeLeft
            } seconds
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