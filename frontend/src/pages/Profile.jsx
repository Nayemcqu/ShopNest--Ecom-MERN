import { useState,useEffect,useContext} from "react";
import { authContext } from "../context/authContext";
import { useNavigate,Link } from "react-router-dom";
import '../styles/profile.css'

export default function Profile(){

const {user,logout}=useContext(authContext);
const navigate=useNavigate();
const [orders,setOrders]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
if(!user){
    navigate('/login');
return;
}
const fetchMyOrders=async()=>{

    try{
const res=await fetch('/api/orders/myOrders',{

    method:'GET',
    headers:{
      'Content-Type':'application/json'  
    },
credentials:'include'
})

const data=await res.json();

if(res.ok){
    setOrders(Array.isArray(data)? data :[]);
}
else{

    // Token obsolete or 401: clear and bounce
if(res.status=== 401){
    logout();
    navigate('/login');
}
setOrders([])
}

    }
    catch(error){
console.error(error);
    }
finally{
    setLoading(false);
}

};

fetchMyOrders();
},[user,navigate])


function handleLogout(){
    logout();
    navigate('/login');
}

if(!user) return null;

return (

<div className="profile-container">
<div className="profile-user-detail-container">
<div>

<h2> My profile </h2>

<p><span> Name:</span> {user.name} </p>

<p> <span>Email:</span> {user.email} </p>
<p className="account-type"><span> Account Type: </span> { user.role.toUpperCase()}</p>
</div>

<button onClick={handleLogout} className="btn">Logout </button>
</div>

<h3>Order History</h3>

{loading ? (
 <p style={{color:'#a1a1aa'}}> fetching your orders</p>   
): orders.length === 0 ?(
<div>
<p>
You haven't placed any orders yet.
</p>
<Link to="/" className="btn" style={{margin:'20px'}}> start shopping</Link>
</div>

):(

<div>

{
    orders.map(order=>(
 <div key={order._id} className="order-details-container">
  <div className="order-details-left">
    <p>Order id:<span>{order._id}</span></p>
    <p> Placed on: <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
     <p>total: <strong>${order.totalAmount.toFixed(2)}</strong></p>   
      </div> 
<div className="order-details-status">
<span style={{color:order.status==='delivered' ? '#10b981' : order.status === 'shipped' ? '#3b82f6' : '#f5930b'}}>

  {order.status}
</span>

</div>
  </div> 
      
    
    ))}</div>


)}</div>

)

}