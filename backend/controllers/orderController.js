//Placing orders using COD method 
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder=async (req,res)=>{ 
    try{ 
        const {userId,items,amount,address}=req.body; 
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }   

        const newOrder=new orderModel(orderData); 
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}}); 

        res.json({
            success:true,
            message:"Order placed"
        })

    }catch(err){
        console.log(err); 
        res.json({
            success:false,
            message:err.message
        })
        toast.error(err.message);
    }
    
} 

//Placing orders using Stripe
const placeOrderStripe=async (req,res)=>{

}


// Placing orders using Razorpay

const placeOrderRazorpay=async (req,res)=>{

} 
    
//User order data for frontend
const allOrders=async (req,res)=>{

} 

//User Order Data for Frontend
const userOrders=async (req,res)=>{  
    try{
        const {userId}=req.body;   

        const orders=await orderModel.find({userId})  
        console.log(orders);
        res.json({
            success:true,
            orders
        })

    }catch(err){
        console.log(err.message);
        res.json({
            success:false,
            message:err.message
        })
    }
    
} 

//update Order Status from Admin Panel

const updateStatus=async(req,res)=>{

} 

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus }