import Product from "../model/product.js"
import cloudinary from "../config/cloudinary.js"


const getProducts=async(req,res)=>{

try{
const products=await Product.find({});
res.json(products);

}
catch(error){
res.status(500).json({message:'Server Error'});
}


}

const getProductById=async(req,res)=>{

    try{

        const product=await Product.findById(req.params.id);
if(product){
    res.json(product);
}
else{
    res.status(404).json({message:"Product Not Found"});

}


    }

catch(error){
res.status(500).json({message:'Server error'});
}

}


const createProduct=async(req,res)=>{
 
        try{
   const {name,description,price, category,stock}=req.body;

    let imageUrls=' ';
    if(req.file){
        const result=await cloudinary.uploader.upload(req.file.path);
        imageUrls=result.secure_url; 
    }
const product=new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrls
})

const savedProduct=await product.save();

res.status(201).json(savedProduct);

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Server error'});

    }
}

const updateProduct=async(req,res)=>{

try{

    const{name,description,price,category,stock}=req.body;

    const product=await Product.findById(req.params.id);

    if(product){

        product.name=name|| product.name;
        product.description=description|| product.description;
        product.price=price|| product.price;
        product.category=category||product.category;
        product.stock=stock || product.stock;
 

    if(req.file){
const result=await cloudinary.uploader.upload(req.file.path);
product.imageUrl=result.secure_url;
    
    }
const updateProduct=await product.save();
    res.json(updateProduct);

  

}
  else{
res.status.json({message:'Product not Found'});
    }

}
catch(error){
res.status(500).json({message:"server error"});
}
}

const deleteProduct=async(req,res)=>{

    try{

        const product=await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:'Product removed'})
        }
        else{
            res.status(404).json({message:'Product not found'});
        }


    }
    catch(error){

        res.status(500).json({message:'Server error'});
    
    }


}

export {getProducts,getProductById,createProduct,updateProduct,deleteProduct};

