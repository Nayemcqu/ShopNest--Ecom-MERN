import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../utils/sendEmail.js";
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}



// register a new User
const registerUser=async(req,res)=>{

const {name,email,password}=req.body ?? {};

if (!name || !email || !password) {
    return res.status(400).json({
        message: "Name, email, and password are required. Send a JSON request body.",
    });
}

try{

    const exisingUser=await User.findOne({email});

    if(exisingUser){
        return res.status(400).json({message:"User already exists"});
    }
    //TODOS: Hash the password before saving it to the database.you can use a library like bcrypt
   //TODS: Implement JWT token genertion
   //TODOA: OTP sending for verification
   //TODO: Welcome Email

const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);


    const user=await User.create({name,email,password:hashedPassword});
    
    if(user){
        const otp=Math.floor(100000 +Math.random()*900000).toString();
        const message=`Your OTP for ShopNest  registration is ${otp}`;
        console.log(`email is ${email}`);
        await sendEmail(email,'ShopNest Registration OTP',message);
            res.status(201).json({
             
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
                role:user.role,
            }
            );

    }

    else{
        res.status(400).json({message:"Invalid user data"});
    }

} catch (error) {
    res.status(500).json({message:"Internal server error"});
}
};

const loginUser=async(req,res)=>{
    const {email,password}=req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required. Send a JSON request body.",
        });
    }

    try{
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
                role:user.role,
            })
        }
        else{
            res.status(400).json({message:"Invalid email or password"});
        }   
}
catch(error){
    res.status(500).json({message:"Internal server error"});
}
}

const getUsers=async(req,res)=>{
    try{
        const users=await User.find({}).select("-password");
        res.json(users);
    
}
catch(error){
    res.status(500).json({message:"internal server error"});
}
}
export { registerUser, loginUser, getUsers };

