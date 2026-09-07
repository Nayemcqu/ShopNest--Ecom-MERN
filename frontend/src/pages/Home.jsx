import {useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {

  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);

useEffect(()=>{
fetchProducts=async()=>{

  try{
const res=await fetch('api/products')
const data=await res.json();
setProducts(data.slice(0,4)); //Featured products
  }
  catch(err){
    console.log(err);
  }
  finally{
    setLoading(false);
  }

}
},[])

  return (
   <div className='home-container'>
<div className="hero-banner">

<h1>Welcome to ShopNest</h1>
<p>Your one-stop destination for all && at unbeatable price.</p>
</div>

<h2>featured products</h2>

{
  loading ? (
    <p>Loading...</p>
  ):(
    <div className="product-grid">
      {products.map((product)=>{
<ProductCard key={product._id} product={product}/>

      })}
      </div>
  )
}

   </div>
  )
}
