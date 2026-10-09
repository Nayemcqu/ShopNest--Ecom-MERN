import {useEffect, useState,useContext} from 'react'
import { authContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import shopnest from "../assets/shopnest.png";
import '../styles/adminDashboard.css'
export default function AdminDashboard(){

    const {user,loading}=useContext(authContext);
    const navigate=useNavigate();
    const [stats,setStats]=useState(null);

    useEffect(()=>{

if(loading){
    return ;
}


if(!user || user.role!=='admin'){

    navigate('/');
    return;
}

const fetchStats=async()=>{

    try{
const res=await fetch('/api/analytics',{
credentials:'include'
})

const data=await res.json();

if(res.ok){
    setStats(data);
}
else{
    if(res.status===401){
        navigate('/login');
        return;
    }
    setStats({totalOrders:0, totalProducts:0, totalUsers:0,totalRevenue:0});

}

    }catch(error){

console.error(error);


    }

}

fetchStats();
 
},[user,loading,navigate]);

if(loading){
    return <p style={{margin:"0 auto", fontSize:"18px"}}>loading...</p>
}

return(

    <div className='admin-dash-container'>
<div className='admin-dash-header'>
<img src={shopnest}/>
    <h2> Admin Dashboard</h2>
</div>

<p> Welcome back!</p>

{
    stats ?(

<div className='dash-quantity-container'>

<div className='dash-totalOrders'>
<h4> Total Orders</h4>
<p> {stats.totalOrders}</p>
</div>

<div className='dash-totalProducts'>
<h4>Total Products</h4>
<p> {stats.totalProducts}</p>
</div>

<div className='dash-totalUsers'>
<h4>Total Users</h4>
<p>{stats.totaluser}ß</p>
</div>

<div>
<h4>Total Revenue</h4>
<p> ${stats.totalRevenue.toFixed(2)}</p>
</div>
</div>

    ):(
<div> Loading</div>
)}


<div className='dash-administrative-control'>
<h3> Administrative Controls</h3>

<div className='dash-controls'>
<button className='btn' onClick={()=>navigate('/admin/add-product')}>+ Add Product </button>
<button className='btn' onClick={()=>navigate('/admin/products')}> Manage  Products </button>
<button className='btn' onClick={()=>navigate('/admin/orders')}> Manage orders </button>
<button className='btn' onClick={()=>navigate('/admin/users')}> Users Directory </button>


</div>


</div>

    </div>

)


}