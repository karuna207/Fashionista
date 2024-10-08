import React, { useContext, useEffect,useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom"; 


const SearchBar = () => {
  const { search, setsearch, showSearch, setshowSearch } = useContext(ShopContext);   
  const [visible, setvisible] = useState(false)
  const location=useLocation() 

  useEffect(()=>{
    console.log(location.pathname); 
    if(location.pathname.includes("collection")){
      setvisible(true);
    }
    else{
      setvisible(false);
    }
  },[location])

  return showSearch && visible? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
          className="flex-1 outline-none"
          type="text"
          placeholder="Search"
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        onClick={() => {
          setshowSearch(false);
        }}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
