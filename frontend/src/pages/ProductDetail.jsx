import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";

export default function ProductDetail(){

    const {id}=useParams();

    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(true);
    const dispatch=useDispatch();

useEffect(()=>{

    const fetchProduct=async()=>{

        try{
const res=await fetch(`/api/products/${id}`);
const data= await res.json();
setProduct(data);
        }
          catch(error){
console.error(error);
    }
    finally{
        setLoading(false);
    }

    }
  fetchProduct();
},[id])

function handleAddToCart(){
if(product){

dispatch(addToCart(
    {
        productId:product._id,
        name:product.name,
        price:product.price,
        imageUrl:product.imageUrl,
        qty:1
    }))

    alert('successfully added to your cart');
}
};

if(loading){
    return <div style={{ textAlign:'center', margin:'100px', color:'#f97316'}}>
Loading Product...
    </div>
}
if(!product){
    return <div style={{ textAlign:'center', margin:'100px', color:'#ef4444'}}>
product not Found
    </div>
}

return(
<div className="product-detail-wrapper" style={{maxWidth:'1200px', margin:'0 auto', padding:'20px'}}>

{/*BreadCrumb Navigation */}

<div style={{color:'#a1a1aa', marginBottom:'20px', fontSize:'0.95rem'}}>
<Link to="/" style={{color:'#f97316'}}>Home</Link>/<Link to="/shop" style={{color:'#f97316'}}>Shop</Link>/
{product.category}/<span style={{color:'#fff'}}>{product.name}</span>
</div>

<div className="product-detail">
{/*Left side Image */}
<div className="detail-image-container">
<img src="product.imageUrl" alt={product.name} className="detail-image"/>
</div>

{/*Right side Image */}

<div className="detail-info">
<h2 style={{fontSize:'2.8rem', marginBottom:'10px'}}>{product.name}</h2>
<p className="detail-price" style={{fontSize:'2.5rem', margin:'15px 0'}}>${product.price.toFixed(2)}</p>
</div>

{/*Description*/}
<div style={{marginBottom:'25px'}}>
<h4 style={{color:'#fff',marginBottom:'10px'}}>Product Description</h4>
<p style={{color:'#a1a1aa', lineHeight:'1.8'}}>{product.description}</p>
</div>

{/*Cart & Stock Actions*/}

<div style={{display:'flex',alignItems:'center', gap:'20px'}}>
<button onClick={handleAddToCart} className="btn" style={{flexGrow:'1',padding:'18px', fontSize:'1.2rem'}}>Add to shopping cart</button>
</div>

<p style={{marginTop:'20px', color:product.stock>0 ? '#10b981': '#ef4444',fontWeight:'600' }}>

    {product.stock > 0 ? `In stock(${product.stock}) units Available` :`Temporarily out of stock`}
</p>


</div>

</div>


)

}