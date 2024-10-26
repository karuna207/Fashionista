import express from "express" 
import { getUserCart,updateCart,addToCart } from "../controllers/cartController" 
import authUser from "../middleware/Auth";

const cartRouter=express.Router();

cartRouter.post("/get",authUser,getUserCart);
cartRouter.post("/add",authUser,addToCart);
cartRouter.post("/update",authUser,updateCart); 


export default cartRouter;