import { useEffect,useState,useContext } from "react";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";
import "../styles/adminProducts.css"
export default function AdminProducts(){

    const {user}=useContext(authContext);
   const [products,setProducts]=useState([]);


useEffect(()=>{
    
    
    const fetchProduct=async()=>{

    const res=await fetch('/api/products');
    const data=await res.json();
setProducts(Array.isArray(data) ? data :[]);

    }
    fetchProduct();
}

,[user])

async function handleDelete(id){

if(window.confirm('Are you really sure you want to delete this?')){
    const res=await fetch(`/api/products/${id}`,{
        method:'DELETE',
        credentials:'include'
    });

    if(res.ok){
        setProducts(products.filter(p=>p._id!==id));
    }

}



}

return(
<div className="admin-products-container">

<div className="admin-products-header">

<h2>Manage Products</h2>
<Link to="/admin/add-product" className="btn">+ add Product</Link>

</div>

<div>

<table>
<thead>

<tr>

<th>Id</th>
<th>Name</th>
<th>Price</th>
<th>Category</th>
<th>Stock</th>
<th>Actions</th>

</tr>

</thead>


<tbody>
{
    products.map(product=>(
        <tr key={product._id}>
<td>{ product._id.substring(0.8)}....</td>
<td>{product.name}</td>
<td>{product.price.toFixed(2)}</td>
<td>{product.category}</td>
<td>{product.stock}</td>
<td><Link to={`/admin/edit-product/${product._id}`}> Edit</Link>
<button onClick={()=>handleDelete(product._id)}> Delete</button>
</td>          
        </tr>
    ))
}

</tbody>


</table>

</div>

</div>

)

}