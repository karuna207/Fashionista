import userModel from "../models/userModel.js";

const addToCart=async(req,res)=>{
    try{ 
        const {userId,itemId,size}=req.body;  
        console.log("userid",userId);
        console.log("itemid",itemId);
        console.log("size",size);
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;  
        console.log(userData);
        console.log(cartData);
         
        if(cartData[itemId]){
            if(cartData[itemId][size]){ 
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        }else{
            cartData[itemId]={}; 
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({
            success:true,
            message:'added to cart'
        })
        

    }catch(err){
        console.log(err) 
        res.json({
            success:false,
            message:err.message
        })
    }
}
const updateCart=async(req,res)=>{ 
    try{ 
        const {userId,itemId,size,quantity}=req.body;  
        console.log(quantity) 

        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;

        cartData[itemId][size]=quantity; 
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({
            success:true,
            message:"Updated Successfully"
        })
    }catch(err){ 
        console.log(err); 
        res.json({
            success:false,
            message:"Update unsuccessful"
        })



    }

}
const getUserCart=async(req,res)=>{ 
    try{
 
        const {userId}=req.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData; 

        res.json({
            success:true,
            cartData
        })
    }catch(err){
        console.log(err.message);
        res.json({
            success:false,
            message:err.message
        })
    }

} 

export {addToCart,updateCart,getUserCart};