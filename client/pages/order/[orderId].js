import {useState , useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import UseRequest from '../../hooks/useRequest';
function OrderShow({order , currentUser}) {

    const [timeLeft  , setTimeLeft] =  useState(0);
 
    const  {doRequest , errors}  =  UseRequest({
        url:"/api/payment",
        method:"post",
        body:{
           orderId:order.id ,

        },
        onSuccess:(payment)=>{
       console.log(payment);
        }
    })

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

            <StripeCheckout 
        token={({id})=>doRequest({
            token:id
        })}
        stripeKey = "pk_test_51KZIVOIDbn80GdGKYvaz3rfkGLNLZ8rFphSirHvCzAGHM4zpOSfpaEHx2VPWU7OrJ3fNyxIemNg2wM2rhG4JGN2E00dHwCa2Uh"
        amount = {order.ticket.price * 100}
        email={currentUser.email}
    />
    {errors}
        </div>
      );
}


OrderShow.getInitialProps = async(context ,client)=>{
const {orderId}  = context.query;
const {data}=await client.get(`/api/order/${orderId}`);

return {order:data};
}
export default OrderShow;