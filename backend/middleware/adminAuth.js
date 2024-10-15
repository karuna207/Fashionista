import jwt from "jsonwebtoken"

const adminAuth=async (req,res,next)=>{
    try{ 
        const {token}=req.headers; 
        console.log(token);
        if (!token){
            return res.json({
                success:false,
                message:"User not authorized"
            })
        } 
        
        const token_decode=jwt.verify(token,process.env.JWT_SECRET) 
        if(token_decode!=process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:"User not authorized due to wrong credentials"
            })
        } 

        next();

        
    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
} 

export default adminAuth;
