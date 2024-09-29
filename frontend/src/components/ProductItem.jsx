import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext' 
import { NavLink } from 'react-router-dom';

const ProductItem = (props) => { 
    const {currency} = useContext(ShopContext);

  return (
    
        <NavLink className='text-gray-700 cursor-pointer' to={`product/${props.id}`}>  

        <div className='overflow-hidden'> 
            <img className='hover:scale-110 transition ease-in-out' src={props.image[0]}/>
        </div>

        <p className='pt-3 pb-1 text-sm'>{props.name}</p>  
        <p className='text-sm font-medium'>{currency}{props.price}</p>


        </NavLink>
      

  )
}

export default ProductItem
