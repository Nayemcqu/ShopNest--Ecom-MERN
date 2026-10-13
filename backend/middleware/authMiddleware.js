import jwt from "jsonwebtoken";
import User from "../model/user.js";
import redis from "../config/redis.js";
import crypto from "node:crypto"
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}


export const protect=async(req,res,next)=>{
    try{
const token=req.cookies.token;

if(!token){
  return  res.status(401).json({message:'Not authorized, no token'});
}

const decoded=jwt.verify(token,process.env.JWT_SECRET);

const revoked=await redis.get(`shopnest:revoked:${hashToken(token)}`);

if(revoked){
  return res.status(401).json({
    message: "please try again later! credentials revoked!!."
  })
}

req.user=await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    next();
}

   catch (error) {
    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Redis or another unexpected failure: do not bypass auth.
    console.error("Authentication failed:", error);
    return res.status(503).json({
      message: "Authentication service temporarily unavailable",
    });
  }
}
