import Order from "../model/Order.js";
import User from "../model/user.js";
import Product from "../model/product.js";

export const getAdminStat=async(req,res)=>{

  try{
const totaluser=await User.countDocuments({role:'user'});
const totalOrders=await Order.countDocuments({});
const totalProducts=await Product.countDocuments({});

const orders=await Order.find({});

const totalRevenueData=orders.reduce((acc,order)=>acc+order.totalAmount,0);


res.json({
    totaluser,
    totalOrders,
    totalProducts,
    totalRevenue:totalRevenueData
})

  } 
  catch(error){
res.status(500).json({message:'Error fetching status',error});
  }
  
    

}