import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem"; 
import { useState,useEffect } from "react";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  const [Latest, setLatest] = useState([]);

  useEffect(() => {
    setLatest(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet porro
          vero esse eos natus ratione laudantium reprehenderit eius odit culpa
          eaque quisquam corrupti, quidem architecto libero ullam. Ipsam,
          voluptas veritatis.
        </p>
      </div>

      {/* Rendering Latest  */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
       {Latest.map((item,index)=>{ 
            return <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>

       })}
      </div>
    </div>
  );
};

export default LatestCollection;
