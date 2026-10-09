import { useState } from 'react'
import Home from './pages/Home.jsx'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar.jsx'
import Footer from '../src/components/Footer.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import About from './pages/About.jsx'
import ReturnPolicy from './pages/ReturnPolicy.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx' 
import Profile from './pages/Profile.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminUsers from './admin/AdminUsers.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AddProduct from './admin/AddProduct.jsx'
import EditProduct from './admin/EditProduct.jsx'
import AdminOrders from './admin/AdminOrders.jsx'
function App() {



  return (
    <BrowserRouter>
    <div className='app'>

    
    <Navbar/>
    <main className='main-content'>
      <Routes>
    <Route path="/" element={<Home/>} />  
    <Route path='/about' element={<About/>}></Route>
    <Route path='/disclaimer' element={<Disclaimer/>}></Route>
    <Route path='/returnPolicy' element={<ReturnPolicy/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/products/:id' element={<ProductDetail/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/payment-success' element={<PaymentSuccess/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/admin' element={<AdminDashboard/>}></Route>
    <Route path='/admin/users' element={<AdminUsers/>}></Route>
    <Route path='/admin/products' element={<AdminProducts/>}></Route>
    <Route path='/admin/add-product' element={<AddProduct/>}></Route>
    <Route path='/admin/edit-product/:id' element={<EditProduct/>}></Route>
    <Route path='/admin/orders' element={<AdminOrders/>}></Route>
      </Routes> 
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
