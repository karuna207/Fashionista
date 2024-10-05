import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => {
      return item.bestseller == true;
    });
    setbestseller(bestproduct.slice(0, 5));
    console.log(bestseller);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={" SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          laborum reprehenderit, velit sequi natus maiores quae fugiat animi
          earum labore at perspiciatis corporis fugit tempora impedit sed cum
          voluptatum reiciendis.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bestseller.map((item, ind) => {
            return <ProductItem
              key={ind}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
