import jwt from "jsonwebtoken";
import User from "../model/user.js";


export const protect=async(req,res,next)=>{
    try{
const token=req.cookies.token;

if(!token){
    res.status(401).json({message:'Not authorized, no token'});
}

const decoded=jwt.verify(token,process.env.JWT_SECRET);

req.user=await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    next();
}

   catch (error) {
    console.error(error);
  }
}
