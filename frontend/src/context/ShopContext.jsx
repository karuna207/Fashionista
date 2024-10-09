import { createContext, useState,useEffect, useCallback } from "react"; 
import { products } from "../assets/assets";


export const ShopContext=createContext();

const ShopContextProvider=(props)=>{ 

    const currency='$'; 
    const delivery_fee=10;  

    const [search, setsearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [cartitems, setcartitems] = useState({}) 

    const  AddtoCart= async (itemId,size)=>{
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
        
    } 



    useEffect(() => {
      console.log(cartitems);
     
    }, [cartitems])
    



    const value={
        products,currency,delivery_fee,search,setsearch,showSearch,setshowSearch,cartitems,AddtoCart
    }  

  

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
} 


export default ShopContextProvider;
