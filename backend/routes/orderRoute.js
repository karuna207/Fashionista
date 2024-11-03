import express from "express"; 
import {verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus } from "../controllers/orderController.js" 
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/Auth.js";

const orderRouter=express.Router();

//admin 
orderRouter.post("/list",adminAuth,allOrders);    
orderRouter.post("/status",adminAuth,updateStatus);  

//payment
orderRouter.post("/place",authUser,placeOrder); 
orderRouter.post("/stripe",authUser,placeOrderStripe); 
orderRouter.post("/razorpay",authUser,placeOrderRazorpay);  

//user
orderRouter.post("/userorders",authUser,userOrders);
orderRouter.post("/verifyStripe",authUser,verifyStripe);
 
export default orderRouter;


