import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; 
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const [size,setsize]=useState('')
  const { products,currency, } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [Image, setImage] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  console.log(productId);

  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => {
              return (
                <img
                  onClick={() => {
                    setImage(item);
                  }}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={Image} className="w-full h-auto" alt="" />
          </div> 
        </div>  
        <div className='flex-1'>
            <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1> 
            <div className='flex items-center gap-1 mt-2'>
              <img  className='w-3 5' src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5'/> 
              <p className='pl-2'>(122)</p>
            </div> 
            <p className='mt-5 text-3xl font-medium'> {currency}{productdata.price}</p> 
            <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p> 
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p> 
              <div className='flex gap-2'>
                  {productdata.sizes.map((item,ind)=>{
                      return <button onClick={()=>{setsize(item)}}className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500':''} `} key={ind}>{item}</button>
                  })}
              </div>
            </div> 
            <button className='bg-black px-8 text-white py-3 text-sm active:bg-gray-700'>ADD TO CART</button> 
            <hr className='mt-8 sm:w-4/5'/>
        </div> 
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
