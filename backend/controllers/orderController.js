//Placing orders using COD method 
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"; 
import Stripe from "stripe";
 

const currency='inr';
const deliveryCharge=10;

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

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
    try{ 
        const {userId,items,amount,address}=req.body;
        const {origin}=req.headers; 

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        } 
        
        const newOrder=new orderModel(orderData); 
        await newOrder.save(); 

        const line_items=items.map((item,ind)=>{
            return {
                price_data:{
                    currency:currency,
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100
                },
                quantity:item.quantity
            }
        }) 

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            success_url:"${origin}/verify?success=true&orderId=${newOrder._id}",
            cancel_url:"${origin}/verify?success=true&orderId=${newOrder._id}",
            line_items,
            mode:'payment'
        }) 

        res.json({
            success:true,
            session_url:session.url
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


// Placing orders using Razorpay

const placeOrderRazorpay=async (req,res)=>{

} 
    
//User order data for frontend
const allOrders=async (req,res)=>{
 
    try{ 
        const orders=await orderModel.find({}); 
        console.log('hi from all orders');
        res.json({
            success:true,
            orders
        })

    }catch(err){ 
        res.json({
            success:false,
            message:err.message
        })

    }
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
    try{
        const {orderId,status}=req.body; 
        console.log(status);
        console.log(orderId)
        await orderModel.findByIdAndUpdate(orderId,{status}) 
        res.json({
            success:true,
            message:"Status Updated"
        })
    }catch(err){
        console.log(err.message); 
        res.json({
            success:false,
            message:err.message
        })
    }
} 

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus }