import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.Fashionista} className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            corrupti, incidunt ex fugiat culpa reprehenderit reiciendis soluta
            quam tempore! Repudiandae consequatur sit blanditiis odio. Sunt
            libero at quae laudantium eligendi!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div> 
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p> 
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 890345671</li>
            <li>fashionista.com</li>
          </ul>
        </div> 
   

       

      </div> 
      <div className="text-center py-5">           
            <hr className="my-4"/>            
            <p className="text-sm">Copyright 2024@ fashionista.com - All Rights Reserved</p>         
      </div>
    </div>
  );
};

export default Footer;
