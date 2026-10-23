import { useEffect,useState,useMemo } from "react";
import { useParams,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import   '../styles/productDetails.css'
import useFetch from "../hooks/useFetch.js";
export default function ProductDetail(){

 const {id}=useParams();

const options=useMemo(()=>{

    return{
    method:'GET',    
credentials:'include',
    headers:{
        'Content-Type':'application/json'

    },
    
    }
})

const{data,loading,error}=useFetch(`/api/product/${id}`,options);

const dispatch=useDispatch();


function handleAddToCart(){
if(data){
    
dispatch(addToCart(
    {
        productId:data._id,
        name:data.name,
        price:data.price,
        imageUrl:data.imageUrls,
        quantity:1,
        
    }))

    alert('successfully added to your cart');
}
};

if(loading){
    return <div style={{ textAlign:'center', margin:'100px', color:'#f97316'}}>
Loading Product...
    </div>
}
if(!data){
    return <div style={{ textAlign:'center', margin:'100px', color:'#ef4444'}}>
product not Found
    </div>
}

return(
<div className="product-detail-wrapper" style={{maxWidth:'1200px', margin:'0 auto', padding:'20px'}}>

{/*BreadCrumb Navigation */}

<div style={{color:'#a1a1aa', marginBottom:'20px', fontSize:'0.95rem'}}>
<Link to="/" style={{color:'#f97316'}}>Home</Link>/<Link to="/shop" style={{color:'#f97316'}}>Shop</Link>/
{data.category}/<span style={{color:'#fff'}}>{data.name}</span>
</div>

<div className="product-detail">
{/*Left side Image */}
<div className="detail-image-container">
<img src={data.imageUrls} alt={data.name} className="detail-image"/>
</div>

{/*Right side details*/}

<div className="detail-info">
<h2 style={{fontSize:'2.8rem', marginBottom:'10px'}}>{data.name}</h2>
<p className="detail-price" style={{fontSize:'2.5rem', margin:'15px 0'}}>${data.price.toFixed(2)}</p>


{/*Description*/}
<div style={{marginBottom:'25px'}}>
<h4 style={{color:'#fff',marginBottom:'10px'}}>Product Description</h4>
<p style={{color:'#a1a1aa', lineHeight:'1.8'}}>{data.description}</p>
</div>

{/*Cart & Stock Actions*/}

<div style={{display:'flex',alignItems:'center', gap:'20px'}}>
<button onClick={handleAddToCart} className="btn add-cart-btn" style={{flex:'1',padding:'18px', fontSize:'1.2rem'}}>Add to shopping cart</button>
</div>

<p style={{marginTop:'20px', color:data.stock>0 ? '#10b981': '#ef4444',fontWeight:'600' }}>

    {data.stock > 0 ? `In stock(${data.stock}) units Available` :`Temporarily out of stock`}
</p>

</div>
</div>

</div>


)

}