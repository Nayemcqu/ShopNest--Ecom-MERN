import {useEffect, useState,useMemo} from 'react'
import ProductCard from '../components/ProductCard.jsx'
import '../styles/home.css'
import useFetch from '../hooks/useFetch.js'
export default function Home() {

const options=useMemo(()=>{
  return{
    method:'GET',
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    }
  }
},[]);


const {data:products,loading,error}=useFetch('/api/products',options);

  return (
   <div className='home-container'>
<div className="hero-banner">

<h1>Welcome to ShopNest</h1>
<p>Your one-stop destination for all, at unbeatable price.</p>
</div>

<h2>featured products</h2>

{
  loading ? (
    <p>Loading...</p>
  ):(
    <div className="product-grid" style={{  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
  gap: "20px",  }} >
      {products.map((product)=>(
<ProductCard key={product._id} product={product}/>

      ))}
      </div>
  )
}

   </div>
  )
}