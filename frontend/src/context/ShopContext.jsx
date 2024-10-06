import { createContext, useState } from "react"; 
import { products } from "../assets/assets";


export const ShopContext=createContext();

const ShopContextProvider=(props)=>{ 

    const currency='$'; 
    const delivery_fee=10;  

    const [search, setsearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);



    const value={
        products,currency,delivery_fee,search,setsearch,showSearch,setshowSearch
    } 

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
} 


export default ShopContextProvider;
