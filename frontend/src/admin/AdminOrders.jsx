import { useEffect,useState,useContext } from "react";
import { authContext } from "../context/authContext";



const AdminOrders=()=>{

const {user}=useContext(authContext);
const [orders,setOrders]=useState([]);



    useEffect(()=>{
const fetchOrders=async()=>{
const res=await fetch('/api/orders',{
    credentials:'include'
})

const data=await res.json();
setOrders(Array.isArray(data) ? data: []);

}
fetchOrders();
 },[user]);


 const updateStatus=async(id,status)=>{

    const res=await fetch(`/api/orders/${id}/status`,{
        method:'PUT',
       headers:{'Content-Type':'application/json'},
       credentials:'include',
       body:JSON.stringify({status})
    })

if(res.ok){
    setOrders(prevOrders=> prevOrders.map(order=>
        order._id === id ? {...order,status} :order
    ))
}
 };

 return(

    <div>
<h2> Manage Orders</h2>
<div>
<table>
    <thead>
<tr>
<th>ORDER ID</th>
<th>USER</th>
<th>TOTAL</th>
<th>DATE</th>
<th>STATUS</th>
</tr>
</thead>
<tbody>
{orders.map(order=>(
<tr key={order._id}>
<td>{order._id.substring(0,8)}...</td>
<td>{order.user?.name || 'Deleted User'}</td>
<td>{order.totalAmount.toFixed(2)}</td>
<td>{new Date(order.createdAt).toLocaleDateString()}</td>

<td>
<select
value={order.status}
onChange={(e)=>updateStatus(order._id,e.target.value)}
>
<option value="pending"> Pending</option>
<option value="shipped"> Shipped</option>
<option value="delivered"> Delivered</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

</div>

    </div>

 )

}
export default AdminOrders;