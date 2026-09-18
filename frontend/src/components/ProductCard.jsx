import {Link} from 'react-router-dom'
import '../styles/productCard.css'

export default function ProductCard({ product }) {
  return (
    <div className="product-card" >
      <img src={product.imageUrls} alt={product.name} className="product-image"/>
      <div className="product-info">
       <h3 className="product-name" >{product.name}</h3>
       <p className="product-price">${product.price.toFixed(2)}</p>
       <Link to={`/products/${product._id}`} className="product-link">
         View Details
       </Link>
       </div>
    </div>
  
)
}