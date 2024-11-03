import React from 'react'
import {assets} from "../assets/assets"
const Navbar = (props) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'> 
        <img className='w-[70px] h-[70px]'src={assets.Fashionista}  alt="" /> 
        
        <button onClick={()=>{
          props.settoken('')
        }} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>   

    </div>
  )
}

export default Navbar
