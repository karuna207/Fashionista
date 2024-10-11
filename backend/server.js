import express from "express"
import cors from "cors"; 
import "dotenv/config"; 
import connectDB from "./config/mongodb.js";  
import connectCloudinary from "./config/cloudinary.js";
 
// App config
const app=express();
const port=process.env.PORT || 4000; 
connectDB() ;
connectCloudinary();
// middleware
 
app.use(express.json()); 
app.use(cors());  



//api endpoints  

app.get("/",(req,res)=>{
    res.send("Hello this is API");
}) 

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})