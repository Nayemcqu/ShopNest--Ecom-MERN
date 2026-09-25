import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useContext } from "react";
import '../styles/paymentSuccess.css'

export default function PaymentSuccess(){

const [searchParams]=useSearchParams();

const sessionId=searchParams.get("session_id");

const cartItems=useSelector(state=>state.cart.cartItems);

const distpatch=useDispatch();

const handleCreateOrder=async()=>{

try{
    const res=await fetch("/api/payment/create-order",
    {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',

        body:JSON.stringify({
            sessionId,
            items:cartItems
        })
    }

    );
    const data=await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
distpatch(clearCart());


}
catch(error){

console.error(error);
}


}

useEffect(()=>{

if(sessionId){
    handleCreateOrder();
}

},[sessionId]);

return(
  <>
  <div className="payment-page-container">

<div className="payment-detail-container">
<p>
    Congratulation's your order have been successfully placed!
</p>

<p className="payment-link-home">Go hack to <Link to={'/'}>Home</Link></p>

</div>

  </div>
  
  </>
)


};