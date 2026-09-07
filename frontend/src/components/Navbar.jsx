
import { Link,useNavigate } from 'react-router-dom'
import {authContext} from '../context/authContext.jsx'
import {useContext} from 'react'
//import {useSelector} from 'react-redux'
import logo from '../assets/shopnest.png'
import '../styles/navbar.css'

export default function Navbar() {
const{user,logout}=useContext(authContext);

const cartItems=[];
//useSelector((state)=>state.cart.cartItems);

const navigate=useNavigate();

const handleLogout=()=>{
    logout();
    navigate('/login');

}

    return (
        <nav className="navbar">
            <div className='navbar-brand'>
                 <Link to="/">ShopNest</Link>
                 <img src={logo} alt="ShopNest Logo" />
            </div>
            <ul className="navbar-links">
                <li><Link to="/">shop</Link></li>
                <li><Link to="/cart">cart(
                    {cartItems?.length??0})
                </Link></li>

{
  user  ? (
    <>
    <li><Link to="/profile">Hi,{user?.name ?? 'User'}</Link></li>
    {user.role==='admin' && <li><Link to="/admin">Admin</Link></li>}
    <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
    </>
  ):(
    <li><Link to="/login">Login</Link></li>
  )
}

            </ul>
        </nav>


    )
    }