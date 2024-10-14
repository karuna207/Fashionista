import mongoose from "mongoose"; 

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}, 

},{minimize:false})  


// minimize:false ensures that mongoose doesnt remove empty objects,so cartData will always be 
//be present even if its empty

const userModel=mongoose.models.user||mongoose.model("user",userSchema);

export default userModel;