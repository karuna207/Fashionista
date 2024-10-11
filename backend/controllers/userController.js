import mongoose from "mongoose";
import userModel from "../models/userModel.js"; 
import validator from "validator"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser=async(req,res)=>{ 
   

} 

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body; 
        //checks email exist or not 
        const exists=await userModel.findOne({email}); 
       

        if(exists){
            return res.json({success:false,message:"user Already exists"})
        } 
           //validating email and password  
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        } 

        if(password.length<8){
            return res.json({success:false,message:"Please enter a Strong Password"})
        }
         
        //hashing user password 

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt); 

        const newUser= new userModel({
            name,
            email,
            password:hashedPassword
        }) 

        const user=await newUser.save();

        const token=createToken(user._id);

        return res.json({
            success:true,
            token
        })

    }catch(err){
        console.log(err); 
        res.json({
            success:false,
            msg:err.message
        })
    }
  
} 

//route for admin Login
const adminLogin=async (req,res)=>{

}
export {loginUser,registerUser,adminLogin};