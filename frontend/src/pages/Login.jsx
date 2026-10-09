import { useState,useContext,useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import { authContext } from "../context/authContext.jsx";

import "../styles/register.css"
export default function Login(){

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [errors,setErrors]=useState({
   email:"",
   password:"",
   general:"" 
})
const {login}=useContext(authContext);
const navigate=useNavigate();
const nameRef=useRef();
const emailRef=useRef();
const passwordRef=useRef();



const handleSubmit=async(e)=>{
     e.preventDefault();

 setErrors({
      email: "",
      password: "",
      general: "",
    });

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
      setErrors({
        email: "Please enter a valid email address",
        password: "",
        general: "",
      });

      return;
    }

      if (!password) {
      setErrors({
        email: "",
        password: "Please enter your password",
        general: "",
      });

      return;
    }

 try{
const res=await fetch('/api/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:"include",
    body:JSON.stringify({email,password})
});

const data=await res.json();

if(res.ok){
alert('Login successful!')
login(data);
navigate('/')
}
else{

    setErrors({
          email: "",
          password: "",
          general: "Incorrect email or password",
        });
  
   
}

}
 catch(error){
setErrors({
        email: "",
        password: "",
        general: "Something went wrong. Please try again.",
      });

 console.error(error);
 }


}

return(
<div className="auth-container">
<form onSubmit={handleSubmit} className="auth-form">
<h2>Login</h2>

<input type="email" placeholder="Email" value={email} onChange={(e)=>{
    setEmail(e.target.value) 
let value=e.target.value;

if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
    setErrors((prev) => ({
                ...prev,
                email: "",
              }))
            
            }
            else{
    setErrors((prev) => ({
                ...prev,
                email: "Your email format is incorrect! please insert a correct email",
              }))
            }
    }} required/>

 {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}

<input type="password" placeholder="Password" ref={passwordRef} value={password} onChange={(e)=>{
    setPassword(e.target.value)

      setErrors((prev) => ({
                ...prev,
                password: "",
                general: "",
              }));
    }} required/>
      {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
<button type="submit" className="btn">Login</button>
<p>Don't have an account?<Link to="/register">Register</Link></p>

</form>

</div>

)

}