import { useState } from 'react'
//import Home from './pages/Home'
import './App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'


function App() {



  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
{/*    <Route path="/" element={<Home/>} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
