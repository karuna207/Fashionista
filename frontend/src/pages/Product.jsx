import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; 
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import FashionChatbot from "../components/FashionChatbot";


const Product = () => {
  const { productId } = useParams();
  const [size,setsize]=useState('')
  const { products,currency,cartitems,setcartitems,AddtoCart} = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [Image, setImage] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setImage(item.image[0]);
        
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
            <button className='bg-black px-8 text-white py-3 text-sm active:bg-gray-700' onClick={()=>{ 
              AddtoCart(productdata._id,size)
            }}>ADD TO CART</button> 
            <hr className='mt-8 sm:w-4/5'/> 
            <div className='text-sm text-gray-500 mt-5 flex flex=col gap-1'>
              <p>100% original product</p>
              <p>Cash on delivery is available on this product </p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
        </div> 
      </div>  
      <div className='mt-10'>
        <FashionChatbot />
      </div>
 

      <div className='mt-20'> 
        <div className='flex'>
          <b className='border px-5 py-3 text-sm '>Description</b>
          <p className='border px-5 py-3 text-sm '>Reviews(122)</p>
        </div> 

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum placeat a, ratione, adipisci eveniet obcaecati odit delectus corrupti officiis quisquam assumenda est veritatis inventore perspiciatis magni quis dicta reiciendis consequatur.</p> 
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium autem, magni obcaecati aut error sunt unde minus, sit animi corporis facere ad perferendis distinctio eaque debitis pariatur asperiores. Maiores, minus!</p>
        </div>

      </div>  

      <RelatedProducts category={productdata.category} subcategory={productdata.subCategory}>

      </RelatedProducts>

      {/* display related products */} 
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
