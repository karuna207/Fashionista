import { createContext, useState,useEffect, useCallback } from "react"; 
// import { products } from "../assets/assets"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext=createContext();

const ShopContextProvider=(props)=>{ 

    const currency='₹'; 
    const delivery_fee=10;  
    const backendUrl=import.meta.env.VITE_BACKEND_URL; 
    console.log(backendUrl) 

    const [search, setsearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [cartitems, setcartitems] = useState({})   
    const [products, setproducts] = useState([]) 
    const [token, settoken] = useState('')
    const navigate=useNavigate();

    const  AddtoCart= async (itemId,size)=>{ 
        if(!size){
            toast.error("Select Product Size") ;
            return ;
        }
        let cartdata=structuredClone(cartitems) 
        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size]+=1;
            }else{
                cartdata[itemId][size]=1
            }
        }else{
            cartdata[itemId]={}; 
            cartdata[itemId][size]=1;
        } 
        setcartitems(cartdata); 

        if(token){
            try{ 
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}}) 
            }catch(err){
                console.log(err)
                toast.err(err.message);
            }
        }
        
    }  

    const getCartCount= ()=>{
        let totalcount=0;
        for (const items in cartitems) {
            for (const item in cartitems[items]) { 
                try{
                    if (cartitems[items][item]>0){
                        totalcount+=cartitems[items][item];
                    }
                }
                catch(err){

                }
                
            }
        }  
        return totalcount
        
}

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartdata=structuredClone(cartitems);
        cartdata[itemId][size]=quantity;  
        console.log("quantity",quantity); 
        console.log('cart data',cartdata);
        console.log("cart items",cartitems)
        setcartitems(cartdata);  
        console.log("after set",cartitems);
        
        if(token){
            try{  
                console.log(itemId);
                console.log(size);
                console.log(quantity);
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

            }catch(err){ 
                console.log(err);
                toast.error(err.message);

            }
        }
   } 

    const getCartAmount=()=>{
        let totalAmount=0 
        for (const items in cartitems) {
            let iteminfo=products.find((product)=>{
                return product._id===items; 
            })  
            console.log(iteminfo);
            for (const item in cartitems[items]) {
                try{
                    if(cartitems[items][item]>0){
                        totalAmount=totalAmount+cartitems[items][item]*iteminfo.price;
                    }
                }catch(err){
                    console.log(err);
                }
            }
        } 
        return totalAmount;
    }
 

    const getUserCart=async(token)=>{ 
        try{
            const response=await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}})  
            if (response.data.success){
                setcartitems(response.data.cartData);

            }
        }catch(err){
            console.log(err.message);
            toast.error(err.message);

        }

    }

    useEffect(() => {
      console.log(cartitems);
     
    }, [cartitems])
    
    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success){
                setproducts(response.data.products);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {  
        getProductData();
    
    
    }, []) 

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            settoken(localStorage.getItem('token')); 
            console.log("refreshed");
            getUserCart(localStorage.getItem('token'));
        }
    },[])
    


    const value={
        products,currency,delivery_fee,search,setsearch,showSearch,setshowSearch,cartitems,AddtoCart,getCartCount,updateQuantity,getCartAmount,navigate
        ,backendUrl,token,settoken,setcartitems
    }  

  

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
} 


export default ShopContextProvider;
