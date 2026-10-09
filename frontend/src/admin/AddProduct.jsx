import {useState,useContext } from "react";
import {authContext} from '../context/authContext';
import { data, useNavigate } from "react-router-dom";
import '../styles/AddProduct.css'

const AddProduct=()=>{

const {user}=useContext(authContext);
const navigate=useNavigate();


const [formData,setFormData]=useState({
    
name:'',description:' ',price:' ',category:' ',stock: ' '
});

const [image,setImage]=useState(null);

const [loading,setLoading]=useState(false);


if(!user || user.role !== 'admin'){

    navigate('/');

    return null;

}

const handleSubmit=async(e)=>{

e.preventDefault();

if(!image) return alert('Please select an image');

setLoading(true);

const data=new FormData();

data.append('name',formData.name)
data.append('description',formData.description)
data.append('price',formData.price)
data.append('category',formData.category)
data.append('stock',formData.stock)
data.append('image',image);


try{
    const res=await fetch('/api/products',{
        method:'POST',
        credentials:'include',
        body:data
    });
const responseData=await res.json();
if(res.ok){
    alert('product created Successfully');
    navigate('/');
}
else{
    alert(responseData.message || 'Error creating product');
}

}

catch(error){
console.error(error);
}
finally{
    setLoading(false);
}

}

    return(
<div className="add-product-container">

<h2>Add new Product</h2>

<form>

<input type="text" placeholder="Product Name" required onChange={(e)=>setFormData({...formData,name: e.target.value})}/>

<textarea placeholder="Description" required rows="4"  onChange={(e)=>setFormData({...formData,description:e.target.value})}/>

<input type="number" placeholder="Price" required onChange={(e)=>setFormData({...formData,price: e.target.value})}/>

<input type="text" placeholder="Category" required onChange={(e)=>setFormData({...formData,category: e.target.value})}/>

<input type="number" placeholder="Stock" required onChange={(e)=>setFormData({...formData,stock: e.target.value})}/>

<div className="image-upload-container">
    <label>Upload Product Image here </label>
    <input type="file" accept="image/*" required onChange={(e)=>setImage(e.target.files[0])}  
    
    />
</div>

<button type="submit" disabled={loading} className="btn" >
    {loading ? 'Uploading & Creating...' : 'publish Product'}
</button>

</form>

</div>



    );

}
export default AddProduct;