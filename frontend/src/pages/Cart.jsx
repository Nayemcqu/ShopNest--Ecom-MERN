import { useSelector,useDispatch } from "react-redux";
import {Link,Navigate} from 'react-router-dom'
import { removeFromCart,addToCart,removeByQuantity } from "../redux/cartSlice";
import '../styles/cart.css'

export default function Cart(){

    const dispatch=useDispatch();
    const cartItems=useSelector((state)=>state.cart.cartItems);
    const navigate=useNavigate();


    const handleAddToCart=(product)=>{

        dispatch(addToCart(
            product
        ))

    }

    const handleRemoveByQuantity=(product)=>{

    dispatch(removeByQuantity(product));
    }

const handleRemoveFromCart=(id)=>{
    dispatch(removeFromCart(id));
}

const totalPrice=cartItems.reduce((acc,item)=>acc + item.price*item.quanity,0);

return(

<div className="cart-container">
<h2>Shopping cart</h2>
  
  { cartItems.length===0 ?(
 <p>Your cart is empty.<Link to="/shop">Go Shopping</Link></p>):
(
<div className="cart-layout">
  <div className="cart-items">
    {
cartItems.map((item)=>(

<div key={item._id} className="cart-item">
<img src={item.imageUrl} alt={item.name} className="cart-item-image"/>
<div className="cart-item-detail">
<h4> {item.name}</h4>
<p>{item.price}</p>
<div className="qty-controls">
<button onClick={()=>handleRemoveByQuantity(item)}>
-
</button>
<span>
    {item.quanity}
</span>

<button onClick={()=>handleAddToCart(item)}>
+
</button>
</div>
<button onClick={()=>handleRemoveFromCart()} className="btn-remove-from-cart">
Remove
</button>
</div>
</div>


))} </div>  
<div className="cart-summary">
<h3>Total:${totalPrice.toFixed(2)}</h3>


<button onClick={()=>navigate('/checkout')} className="btn btn-checkout">
proecced to Checkout
</button>
</div>
</div>
)}


</div>
);

};