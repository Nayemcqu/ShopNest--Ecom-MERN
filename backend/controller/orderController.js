import Order from "../model/Order.js";
import { sendEmail} from "../utils/sendEmail.js";

const createNewOrder=async(req,res)=>{

try{
const {items,totalAmount,address,paymentId}=req.body;

if(!items || items.length===0 || totalAmount===null || !address){

    return res.status(400).json({message:'invalid order data'});
}
else{

    const order=new Order({
 user:req.user._id,
 items,
 totalAmount,
 address,
 paymentId
    })

    await order.save();
const message=`Dear ${req.user.name}, \n\n Thank you for Your order! your order has been successfully placed with the following details:\n\n Order ID: ${order.id}  \n $ ${totalAmount}\n Shipped Address: ${address} \n\n we will notify you once your ordeer is shipped. \n\n Best regards,\n ShopNest Team`;


    await sendEmail(req.user.email,'Order Created',message);
    res.status(201).json({message:'Order created successfully',order});

}


}
catch(error){
    res.status(500).json({message:'Error creating order',error})
}

}

const getOrderbyId=async(req,res)=>{

    try{
const orders=await Order.find({user:req.user._id}).populate('items.productId','name price');
res.json(orders);
}
catch(error){
    res.status(500).json({message:'Error fetching orders',error});
}

}

const getOrders=async(req,res)=>{

    try{

        const orders=await Order.find({}).populate('user ','id name');;
        res.json(orders);
    }
    catch(error){
        res.status(500).json({message:'Error fetching orders',error});
    }

}

const updateorderStatus=async(req,res)=>{

    try{
const {status}=req.body;
const order=await Order.findById(req.params.id);

if(order){
    order.status=status;
    await order.save();
    res.json({message:'Order status updated,order'});
}

    }
    catch(error){
        res.status(500).json('Internal Server Error',error)
    }
}
export { getOrders,getOrderbyId,updateorderStatus,createNewOrder};