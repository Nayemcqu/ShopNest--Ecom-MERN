import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {authContext} from '../context/authContext.jsx';
import {clearCart} from '../redux/cartSlice.js'
import { useContext, useState } from 'react';
import '../styles/checkout.css'
export default function Checkout(){

const {user}=useContext(authContext);
const cartItems=useSelector(state=>state.cart.cartItems);
const dispatch=useDispatch();

const navigate=useNavigate();

const [address,setAddress]=useState({
    fullName:'',street:'',city:'',postalCode:'',country:''
});

const totalPrice=cartItems.reduce((acc,items)=> acc +items.price*items.quantity,0);


const handlePayment=async()=>{
 
    try{


        const orderRes=await fetch('/api/payment/create-checkout-session',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:"include",
            body:JSON.stringify({totalAmount:totalPrice,address,items:cartItems})
        })
    const orderData=await orderRes.json();

if(!orderRes.ok){
throw new Error(orderData.message||'Failed to  create checkout session');

}

  window.location.href=orderData.url;  
    

    }

catch(e){
    console.error(e);
}


}

const handleSubmit=(e)=>{
    
    e.preventDefault();
    if(!user){
        alert("please login first");
        navigate('/login');
return;
    }

    handlePayment();

}


return(
<div className='checkout-container'>

<h2>checkout</h2>
<div className='checkout-content'>
<form onSubmit={handleSubmit}>

<h3>Shipping address</h3>
<input type='text' placeholder='Full Name' required value={address.fullName}
onChange={(e)=>setAddress({...address,fullName:e.target.value})}
/>
<input type='text' placeholder='Street' required value={address.street}
onChange={(e)=>setAddress({...address,street:e.target.value})}
/>

<input type='text' placeholder='City' required value={address.city}
onChange={(e)=>setAddress({...address,city:e.target.value})}
/>

<input type='text' placeholder='Postal Code' required value={address.postalCode}
onChange={(e)=>setAddress({...address,postalCode:e.target.value})}
/>

<input type='text' placeholder='Country' required value={address.country}
onChange={(e)=>setAddress({...address,country:e.target.value})}
/>

<div className='checkout-summary'>

<h4>
    Total to Pay:${totalPrice.toFixed(2)}
</h4>

<button type='submit' className='btn'> Pay Now</button>
</div>

</form>


</div>


</div>


);


}